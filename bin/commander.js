#!/usr/bin/env node
let path = require('path')
let program = require('commander');
let uglifySite = require("../uglifyBuild.js");

//set commander opt
program.version('0.3.1')
    .option('-c, --configPath <n>', '设置配置文件路径 Set Config File Path')
    .option('-m, --modNames <n>', '设置希望执行的模块 Set excute which module')
    .option('-clear --clear', '开始前先清空文件夹 clear dir before start')
    .option('-copy --copy', '不做任何处理只复制 no uglify just copy files')
    .option('-beautity --beautity', '不混淆只处理空格,注释 no uglify just beautity files')
    .parse(process.argv);


console.log(program.configPath)
console.log(program.modNames)
// console.log(program.clear)
// console.log(program.copy)
// console.log(program)

let _cpath = program.configPath || path.resolve("").replace(/\\/g, '/') + '/uglify.config.js';
uglifySite.setConfig(_cpath)
    .then(res => {
        // console.log(uglifySite.options);
        // uglifySite.start('all');
        var exOpt = {};
        if (program.copy) {
            exOpt.justCopy = true;
        }
        if (program.clear) {
            exOpt.clearExportDir = true;
        }
        if(program.beautity){
            exOpt.beautify = true;
        }
        uglifySite.start((program.modNames === 'all') ? 'all' : program.modNames.split(','), exOpt);
    }).catch(err => {
        throw err;
    });
