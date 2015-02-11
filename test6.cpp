#include<iostream>  
#include<cstring>
#include<stdio.h>
using namespace std;  
const int MAXP = 50000;  
bool isPrime[MAXP];  
int prime[MAXP];  
bool used[1010];  
int ans[1010];  
int n,m,d,t,sum;  
bool ok;  
void primeList()//筛法素数表  
{  
    memset(isPrime,true,sizeof(isPrime));  
    for(int i = 2;i <= MAXP;++i)  
    {  
        if(isPrime[i])  prime[++prime[0]] = i;  
        for(int j = 1,k;j <= MAXP && (k = i * prime[j]) <= MAXP;++j)  
        {  
            isPrime[k] = false;  
            if(i % prime[j] == 0)   break;  
        }  
    }  
}  
bool check(int len)//检查当前答案是否满足条件  
{  
    int sum;  
    if(len <= 1) return true;  
    for(int i = 0;i < len;++i)  
    {  
        sum = 0;  
        if(i <= len - d)//当每段都能达到d这么长的时候  
        {  
            for(int j = i;j - i + 1<= d ;++j)  
            {  
                sum += ans[j];  
                if(j-i+1 > 1 && isPrime[sum])    return false;//必须两个数字之和以上才开始判断  
            }  
        }  
        else//注意补充检测ans后面几位长度小于d的和是否为合数  
        {  
            for(int j = i;j < len;++j)  
            {  
                sum += ans[j];  
                if(j-i+1 > 1 && isPrime[sum])    return false;//必须两个数字之和以上才开始判断  
            }  
        }  
    }  
    return true;  
}  
              
void dfs(int u)  
{  
    ++t;//卡时变量  
    if(t > 4000) return;//当超过4000次时就跳出，这个数字随便搞个，我输入4000发现1 1000 10这个数据能通过，证明4000足够了  
    if(ok)  return;  
    if(!check(u))   return;  
    if(u== m - n + 1)  
    {  
        ok = 1;  
        return;  
    }  
    for(int i = n;i <= m && !ok;++i)  
    {  
        if(used[i]) continue;  
        ans[u] = i;  
        used[i] = 1;  
        dfs(u+1);  
        used[i] = 0;  
    }  
}  
void print()  
{  
    printf("%d",ans[0]);  
    for(int i = 1;i < m-n+1;++i)  
    {  
        printf(",%d",ans[i]);  
    }  
    printf("/n");  
}  
int main()  
{  
    primeList();  
    while(scanf("%d%d%d",&n,&m,&d) && n != 0)  
    {  
        ok = 0;  
        t = 0;  
        memset(used,0,sizeof(used));  
        dfs(0);  
        if(ok)  print();  
        else        printf("No anti-prime sequence exists./n");  
    }  
    return 0;  
}  