#include "stdio.h"
#include "stdlib.h"
#include "mysql.h"
#include "string.h"
#define HOST "127.0.0.1"
#define USER "root"
#define PASSWORD "123456"
#define DB "demo"

main()
{
    MYSQL mysql;
    MYSQL_RES *result;
    MYSQL_ROW row;

    char number[10]="";
    char name[50]="";
    char sex[10]="";
    int age;
    float pay;

    char query[200]="";
    char delete[200]="";
    char insert[400]="";
    char update[200]="";
    float max_pay;

    mysql_init(&mysql);
    if ( !mysql_real_connect(&mysql,HOST,USER,PASSWORD,DB,0,NULL,0) ) { /*连接*/
     printf("connect mysql fail!!!\n");
     exit(0);
    }

    strcpy(query,"SELECT `userid`,'username','password','email' FROM `lbs_member` WHERE 1=1"); /*查询*/
    if (mysql_query(&mysql,query) != 0) { /*执行SQL语句*/
     printf("SELECT ERROR!!!\n");
     mysql_close(&mysql);
     exit(0);
    }
    result = mysql_store_result(&mysql);
    while ( ( row = mysql_fetch_row(result) ) ) {
     strcpy(number,row[0]);
    // strcpy(name,row[1]);
   // strcpy(sex,row[2]);
   // pay = atof(row[3]);
   //  if ( pay > max_pay )
   //   max_pay=pay;
   //  printf("number: %s\t name: %s\t sex: %s\t pay: %s\t\n",number,name,sex,pay);
    printf("userid=%s",number);
   }
   // printf("max_pay:%f\n",max_pay);
    mysql_free_result(result);

    //sprintf(delete,"DELETE FROM `PAY` WHERE `FPAY` = %f",max_pay);
    if (mysql_query(&mysql,delete) != 0) {
     printf("DELETE ERROR!!!\n");
     mysql_close(&mysql);
     exit(0);
    }
    else
     printf("DELETE SUCCEED!!!\n");
strcpy(insert,"INSERT INTO `PAY` (`FNUMBER`, `FNAME`, `FSEX`, `FAGE`, `FPAY`) VALUES ('000002', 'Aaron', 'men', 30, '6000.00')");
    if (mysql_query(&mysql,insert) != 0) {
     printf("INSERT ERROR!!!\n");
     mysql_close(&mysql);
     exit(0);
    }
    else
     printf("INSERT SUCCEED!!!\n");

    strcpy(update,"UPDATE `PAY` SET `FPAY`=`FPAY` + 1000 WHERE 1");
    if (mysql_query(&mysql,update) != 0) {
     printf("UPDATA ERROR!!!\n");
     mysql_close(&mysql);
     exit(0);
    }
    else
     printf("UPDATA SUCCEED!!!\n");
    mysql_close(&mysql);
}
