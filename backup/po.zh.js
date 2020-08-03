(function (root, data) {
    var loaded, module;

    /* Load into Cockpit locale */
    if (typeof cockpit === 'object') {
        cockpit.locale(data)
        loaded = true;
    }

    if (!loaded)
        root.po = data;

    /* The syntax of this line is important  by po2json */
}(this, {
    "": {
        "language": ""
    },
    "Backup/Restore": [
        null,
        "备份恢复"
    ],
    "SQL Backup": [
        null,
        "SQL 备份"
    ],
    "SQL Restore": [
        null,
        "SQL 恢复"
    ],
    "Log Download": [
        null,
        "日志下载"
    ],
    "Download": [
        null,
        "下载"
    ],
    "Upload": [
        null,
        "上传"
    ],
    "Select File":[
        null,
        "选择文件"
    ],
    "Upload Failure":[
        null,
        "上传失败"
    ]
}));
