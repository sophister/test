#!/bin/sh

#         Readme
# RD同学 sh deploy.sh     //默认所有子系统全部编译
# 指定的子系统(module)  sh deploy.sh -m mo-common,mo-car
#

#定义颜色
WHITE="\e[1;37m"
RED="\e[1;31m"
blue="\e[0;34m"
BLUE="\e[1;34m"
NC="\e[0m"

# 准备初始化环境
Prepare(){
    cwd=`pwd`
    deployDir="${cwd}/../../"
    sourceDir=${cwd}
}

# 编译一个子系统 Build common
Build(){
    moduleName=$1
    moduleDir="${sourceDir}/${moduleName}"

    if [ -d ${moduleDir} ]
    then
        cd ${moduleDir}
        if [[ "local" = ${des} ]]
        then
            if [ $optimize ]
            then
                jello release -d local -com
            else
                jello release -d local -cm
            fi
        else
            if [ $optimize ]
            then
                jello release -com
            else
                jello release -cm
            fi
        fi
    else
        echo "${moduleDir}文件夹不存在"
    fi
}


#入口函数
startBuild(){

    Prepare
    
    if [ ! -z $buildModules ]
    then
        OLD_IFS="$IFS"
        IFS=","
        moduleList=($buildModules)
        IFS="$OLD_IFS"
    fi


    for module in ${moduleList[@]}
    do
        echo $module
        Build $module
    done
}

#子系统列表
moduleList=("common" "user" "home" "invest")

#命令行参数分析
while getopts "d:m:o" arg
do
    case $arg in
        d)
            des=$OPTARG
            ;;
        m)
            buildModules=$OPTARG #指定编译的子系统
            ;;
        o)
            optimize=true
            ;;
        ?)  #当有不认识的选项的时候arg为?
            echo -e ${RED} "参数错误" ${NC}
    exit 1
    ;;
    esac
done

startBuild
