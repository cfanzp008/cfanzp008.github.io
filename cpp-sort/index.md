# C++排序算法


<!--more-->
# C++排序算法
## 1.冒泡排序
- 冒泡排序中，比较相邻的2项，交换顺序不对的项。
- 第一轮从首相开始比较，最后一轮只比较最后2个数。
- 时间复杂度为O(nxn)。

```c++
#include <iostream>
#include <vector>
using namespace std;

// 冒泡排序
void sort_maopao() {
    // 将下面10个数从小到大排列
    int a[] = {3,5,6,7,9,8,0,2,4,1};
    for (int i=0;i<10; ++i) {
       for (int j=0;j<10-i-1; ++j) {
           if (a[j] > a[j+1]) {
               int t = a[j];
               a[j] = a[j+1];
               a[j+1] = t;
           }
       }
    }

    for(int i=0;i<10;i++) {
        cout << "a[" << i << "]=" << a[i] << endl;
    }
}

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for(int i=0; i < n-1; i++) {
        for(int j=0 ; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j],arr[j+1]);
            }
        }
    }
}

int main() {
    sort_maopao();
    cout << endl;
    vector<int> b = {1,3,5,10,6,9,2,7};
    bubbleSort(b);
    for(int i=0;i<b.size(); ++i) {
        cout << "b[" << i << "]:" << b[i] << endl;
    }
    return 0;
}
// g++ -o demo_sort --std=c++11 demo_sort.cpp
```

## 2.选择排序
- 每次遍历只找出一个最大项。
- 找到最大项后把它放到正确的位置。
- 时间复杂度为O(nxn)。

```c++
void selectSort(vector<int>& arr) {
    int n = arr.size();
    for (int i=0;i<n;++i) {
        int index = 0;
        // 找处前面n-i项中的最大项的arr[index]
        for (int j=1;j<n-i;++j) {
            if (arr[j] > arr[index]) {
                index = j;
            }
        }
        // 将arr[index]放到正确的位置arr[n-i0]
        swap(arr[index],arr[n-i-1]);
    }
}
```

## 3.插入排序
- 插入排序保证前面的已经排好了。
- 时间复杂度为O(nxn)。
```c++
void insertSort(vector<int>& arr) {
    int n = arr.size();
    for (int i=1;i<n;++i) {
        for(int j=i;j>0;j--) {
            if (arr[j] < arr[j-1]) {
                swap(arr[j],arr[j-1]);
            } else {
                break;
            }
        }
    }
}
```

## 4.归并排序
```c++
void merge(vector<int>& v, int left, int mid, int right){
    vector<int> temp = v;
    int i = left, j = mid + 1;
    int index = left;
    while(i <= mid || j <= right){
        if(i > mid){
            v[index++] = temp[j];
            j++;
        }
        else if(j > right){
            v[index++] = temp[i];
            i++;
        }
        else if(temp[i] < temp[j]){
            v[index++] = temp[i];
            i++;
        }
        else{
            v[index++] = temp[j];
            j++;
        }
    }
}
```

- 递归将数据分割成2个部分
```
void merge_Sort(vector<int>& v, int left, int right){
    if(left >= right) return;
    int mid = (left + right) / 2;
    merge_Sort(v, left, mid);
    merge_Sort(v, mid + 1, right);
    if(v[mid] > v[mid + 1]){
        merge(v, left, mid, right);
    }
}
```

- 归并排序
```
void mergeSort(vector<int>& v){
    int n = v.size();
    merge_Sort(v, 0, n - 1);
}
```

## 5.快速排序
- 通过一次排序，将数据分割成2个部分,分割后的2部分数据中，其中一部分的数据都比李旺一部分小
- 然后对2部分数据进行递归快速排序
- 时间复杂度为O(nlogn)。

```c++
void quick_Sort(vector<int>& arr, int left, int right){
    if(left >= right) {
        return;
    }
    //取最左边的数为基数
    int i = left, j = right, base = arr[left];
    while(i < j){
        while(arr[j] >= base && i < j){
            j--;
        }
        while(arr[i] <= base && i < j){
            i++;
        }
        if(i < j){
            swap(arr[i], arr[j]);
        }
    } 
    arr[left] = arr[i];
    arr[i] = base;
    quick_Sort(arr, left, i - 1);
    quick_Sort(arr, i + 1, right);
}

void quickSort(vector<int>& arr){
    int n = arr.size();
    quick_Sort(arr, 0, n - 1);
}
```

## 参考
- https://zhuanlan.zhihu.com/p/121066684
- https://www.runoob.com/w3cnote/ten-sorting-algorithm.html


---

> 作者:   
> URL: http://111.230.8.71:8889/cpp-sort/  

