# RAG检索增强生成分类详解


# RAG检索增强生成分类详解

## 背景

随着大语言模型（LLM）的快速发展，如何让AI在生成内容时准确引用最新、最相关的信息成为一个核心挑战。检索增强生成（Retrieval-Augmented Generation，简称RAG）技术应运而生，它通过结合检索系统和生成模型的优势，显著提升了AI输出的准确性和可信度。本文将详细介绍RAG的分类体系，帮助读者根据不同场景选择合适的RAG方案。

## RAG基本工作原理

RAG的核心思想是将用户查询与外部知识库相结合，其工作流程主要包括以下几个环节：

1. **文档处理**：将原始文档切分为Chunks（文本块），每个chunk经过Embedding模型转换为向量
2. **向量存储**：将向量存入向量数据库（如Milvus、Pinecone、Chroma等）
3. **语义检索**：用户查询同样被转换为向量，在向量数据库中检索最相关的Top-K个chunks
4. **增强生成**：将检索到的相关文档作为上下文，连同用户问题一起发送给LLM生成回答

```
用户问题 → 向量化 → 向量数据库检索 → 上下文组装 → LLM生成 → 回答输出
```

## RAG分类体系

根据技术复杂度和应用场景，RAG可以分为以下几类：

### 1. 简单RAG（Naive RAG）

简单RAG是最基础的实现方式，采用"检索-拼接-生成"的直线路径。

**工作流程**：
- 用户输入查询
- 一次性从向量数据库检索Top-K相关文档
- 将检索结果与查询拼接后发送给LLM

**优点**：架构简单、实现成本低、延迟低

**缺点**：当检索结果不准确或包含噪声时，生成质量会明显下降；无法处理复杂的多跳推理问题

**适用场景**：文档问答、知识库查询、结构简单的FAQ系统

```python
# 简单RAG实现示例
from langchain_ollama import OllamaLLM
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings

# 初始化组件
llm = OllamaLLM(model="qwen2.5:7b")
embedding = OllamaEmbeddings(model="bge-m3")
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedding)

# 简单RAG流程
def naive_rag(query: str, top_k: int = 3) -> str:
    # 1. 检索相关文档
    docs = vectorstore.similarity_search(query, k=top_k)
    
    # 2. 拼接上下文
    context = "\n".join([doc.page_content for doc in docs])
    prompt = f"根据以下上下文回答问题。\n\n上下文：{context}\n\n问题：{query}\n\n回答："
    
    # 3. 生成回答
    return llm.invoke(prompt)

# 使用示例
answer = naive_rag("RAG的中文全称是什么？")
print(answer)
```

### 2. 检索增强RAG（Retrieval-Augmented RAG）

在简单RAG基础上加入了更精细的检索策略，包括：

**查询优化**：
- 查询改写（Query Rewriting）：将用户模糊查询转换为明确的检索查询
- 查询扩展（Query Expansion）：生成多个相关查询，扩大检索范围

**检索优化**：
- 混合检索：结合稠密向量检索和稀疏关键词检索（BM25）
- 重排序（Re-ranking）：初排后使用更复杂的模型进行二次排序

```python
# 检索增强RAG示例
from langchain.retrievers import EnsembleRetriever
from langchain_community.retrievers import BM25Retriever

# 混合检索器
def create_ensemble_retriever(docs, embeddings):
    # 稀疏检索器
    bm25_retriever = BM25Retriever.from_documents(docs)
    
    # 稠密检索器（向量检索）
    dense_retriever = vectorstore.as_retriever(
        search_kwargs={"k": 10}
    )
    
    # 组合检索器（权重融合）
    ensemble = EnsembleRetriever(
        retrievers=[bm25_retriever, dense_retriever],
        weights=[0.3, 0.7]
    )
    return ensemble

# 查询改写示例
def rewrite_query(query: str) -> str:
    rewrite_prompt = f"将以下用户问题改写为一个清晰、无歧义的检索查询。\n\n问题：{query}\n\n改写后："
    return llm.invoke(rewrite_prompt)

# 增强RAG流程
def enhanced_rag(query: str) -> str:
    # 查询改写
    rewritten_query = rewrite_query(query)
    
    # 混合检索
    retriever = create_ensemble_retriever(docs, embedding)
    docs = retriever.invoke(rewritten_query)
    
    # 组装上下文
    context = "\n".join([doc.page_content for doc in docs[:3]])
    prompt = f"基于以下信息回答问题，如信息不足请明确说明。\n\n{context}\n\n问题：{query}"
    
    return llm.invoke(prompt)
```

### 3. 模块化RAG（Modular RAG）

模块化RAG将RAG系统拆分为多个可独立配置的功能模块，提供了更高的灵活性。

**核心模块包括**：

| 模块 | 功能描述 |
|------|----------|
| 检索模块 | 支持多路召回、查询扩展、动态检索阈值 |
| 记忆模块 | 利用LLM生成的历史上下文增强检索 |
| 路由模块 | 根据查询类型将请求路由到不同处理路径 |
| 融合模块 | 对多路检索结果进行综合排序 |
| 生成模块 | 支持不同LLM、提示词模板、后处理 |

```python
# 模块化RAG架构示例
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class RAGModule(ABC):
    """RAG模块基类"""
    @abstractmethod
    def process(self, input_data: any) -> any:
        pass

class QueryRouter(RAGModule):
    """查询路由模块"""
    def __init__(self):
        self.routes = {
            "代码相关": "code_chain",
            "技术概念": "concept_chain", 
            "实际应用": "practical_chain"
        }
    
    def process(self, query: str) -> str:
        # 简单分类逻辑
        for keyword, route in self.routes.items():
            if keyword in query:
                return route
        return "default_chain"

class MultiVectorRetriever(RAGModule):
    """多向量检索模块"""
    def __init__(self, vectorstores: dict):
        self.vectorstores = vectorstores
    
    def process(self, query: str) -> List:
        results = []
        for name, vs in self.vectorstores.items():
            docs = vs.similarity_search(query, k=2)
            results.extend(docs)
        # 按相关度排序
        return sorted(results, key=lambda x: x.metadata.get('score', 0), reverse=True)[:5]

class ModularRAG:
    """模块化RAG系统"""
    def __init__(self):
        self.modules = {
            'router': QueryRouter(),
            'retriever': MultiVectorRetriever({}),
            'llm': OllamaLLM(model="qwen2.5:7b")
        }
    
    def invoke(self, query: str) -> str:
        # 路由
        chain_name = self.modules['router'].process(query)
        
        # 检索
        docs = self.modules['retriever'].process(query)
        
        # 生成
        context = "\n\n".join([doc.page_content for doc in docs])
        prompt = f"上下文：{context}\n\n问题：{query}"
        return self.modules['llm'].invoke(prompt)
```

### 4. 知识图谱增强RAG（KG-RAG）

将知识图谱（Knowledge Graph）引入RAG系统，实现结构化知识的深度推理。

**优势**：
- 支持多跳推理问答
- 关系路径可解释性强
- 能够处理复杂的实体关联查询

```python
# 知识图谱RAG示例
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_community.graphs import Neo4jGraph

# 构建知识图谱
def build_knowledge_graph(docs: List[Document]) -> Neo4jGraph:
    graph = Neo4jGraph()
    
    # 使用LLM从文档中提取知识三元组
    for doc in docs:
        triples = extract_triples(doc.page_content)
        for subject, predicate, obj in triples:
            graph.add_triple(subject, predicate, obj)
    
    return graph

# 知识图谱检索
def kg_rag_query(query: str, graph: Neo4jGraph, vectorstore) -> str:
    # 1. 从查询中提取实体
    entities = extract_entities(query)
    
    # 2. 知识图谱子图检索
    kg_context = ""
    for entity in entities:
        subgraph = graph.get_neighbors(entity, depth=2)
        kg_context += format_subgraph(subgraph)
    
    # 3. 向量检索补充
    vector_docs = vectorstore.similarity_search(query, k=2)
    
    # 4. 融合上下文
    combined_context = f"知识图谱信息：\n{kg_context}\n\n相关文档：\n{chr(10).join([d.page_content for d in vector_docs])}"
    
    # 5. 生成回答
    prompt = f"基于以下信息回答问题：\n\n{combined_context}\n\n问题：{query}"
    return llm.invoke(prompt)
```

### 5. Agent增强RAG（Agentic RAG）

引入AI Agent实现自主决策和迭代优化，是当前RAG发展的前沿方向。

**核心特性**：
- **动态规划**：Agent根据问题类型选择最优处理策略
- **迭代优化**：多轮检索-评估-重检索循环
- **工具调用**：支持调用搜索、计算、代码执行等多种工具
- **自我纠错**：评估生成结果质量，必要时重新检索

```python
# Agentic RAG实现示例
from langchain_core.messages import HumanMessage, SystemMessage
from langchain.agents import AgentExecutor, create_react_agent

class AgenticRAG:
    def __init__(self):
        self.tools = [
            # 向量检索工具
            Tool(name="vector_search", func=self.vector_search, 
                 description="从向量数据库检索相关文档"),
            # 知识图谱工具
            Tool(name="kg_query", func=self.kg_query,
                 description="查询知识图谱获取实体关系"),
            # 搜索引擎工具
            Tool(name="web_search", func=self.web_search,
                 description="搜索互联网获取最新信息"),
            # 评估工具
            Tool(name="evaluate", func=self.evaluate_answer,
                 description="评估当前回答的质量")
        ]
        
        self.agent = create_react_agent(llm, self.tools)
        self.executor = AgentExecutor(agent=self.agent, tools=self.tools, verbose=True)
    
    def solve(self, query: str) -> str:
        # Agent自主决策执行流程
        result = self.executor.invoke({
            "input": f"回答用户问题：{query}\n如需检索信息请使用工具。",
            "max_iterations": 5
        })
        return result["output"]
    
    def vector_search(self, query: str) -> str:
        docs = vectorstore.similarity_search(query, k=3)
        return "\n".join([f"[文档{i+1}] {d.page_content}" for i, d in enumerate(docs)])
    
    def kg_query(self, query: str) -> str:
        # 知识图谱查询逻辑
        return "知识图谱查询结果..."
    
    def web_search(self, query: str) -> str:
        # 网络搜索逻辑
        return "网络搜索结果..."
    
    def evaluate_answer(self, question: str, answer: str) -> str:
        evaluation_prompt = f"评估以下回答是否准确回答了问题：\n问题：{question}\n回答：{answer}\n评估："
        return llm.invoke(evaluation_prompt)
```

## RAG分类对比

| 类型 | 复杂度 | 检索精度 | 推理能力 | 适用场景 |
|------|--------|----------|----------|----------|
| 简单RAG | 低 | 中 | 弱 | 简单问答、FAQ |
| 检索增强RAG | 中 | 高 | 中 | 企业知识库、智能客服 |
| 模块化RAG | 中高 | 高 | 中强 | 复杂业务系统 |
| KG-RAG | 高 | 高 | 强 | 多跳推理、关系查询 |
| Agentic RAG | 最高 | 可迭代 | 最强 | 开放式问题解决 |

## 实际应用场景

### 1. 企业内部知识库问答

员工可以通过自然语言查询公司制度、技术文档、会议记录等，无需记忆具体位置。

### 2. 医疗诊断辅助

结合医学文献和患者病历，辅助医生进行诊断决策。

### 3. 法律文书分析

快速检索相关判例和法条，生成法律意见书。

### 4. 金融报告生成

实时检索市场数据和财报信息，生成投资分析报告。

## 总结

RAG技术从简单的"检索-生成"模式发展到如今多模态、Agent化的复杂架构，反映了AI系统向更高智能化演进的趋势。选择合适的RAG分类需要综合考虑业务需求、技术能力、成本预算等因素。对于初创项目，建议从简单RAG起步，逐步向模块化RAG演进；对于需要深度推理的场景，KG-RAG和Agentic RAG是更好的选择。

随着向量数据库、Embedding模型、LLM能力的不断提升，RAG技术将继续演进，在更多领域发挥重要作用。

## 参考资料

- [LangChain Documentation](https://python.langchain.com/)
- [RAG Survey: Retrieval-Augmented Generation for AI-Generated Content](https://arxiv.org/abs/2312.10997)
- [Neo4j Graph Database](https://neo4j.com/)


---

> 作者: [](https://cfanzp008.github.io/about/)  
> URL: https://cfanzp008.github.io/rag-classification-detailed-guide/  

