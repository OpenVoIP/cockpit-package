
const maxReadSize = 50 * 1024 * 1024;

const dataDownload = document.getElementById("data_download");

dataDownload.addEventListener("click", () => {
    cockpit.script("/root/.local/share/cockpit/backup/bin/back_db.sh").stream(() => { })
        .then(() => {
            return cockpit.file('/tmp/sql.sql', { max_read_size: maxReadSize }).read().then((data) => {
                let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
                saveAs(blob, `${new Date().getTime()}.sql`)
            });
        })
        .catch(err => {
            console.error(err);
        });
});

const dataUpload = document.getElementById("data_upload");
let uploadData;
dataUpload.addEventListener("click", () => {
    cockpit.file('/tmp/sql.sql').replace(uploadData).then(() => {
        return cockpit.script("/root/.local/share/cockpit/backup/bin/import_db.sh").stream(() => { });
    }).catch(err => {
        console.error(err);
    });
});


let uploadFile = document.getElementById('upload_file');
uploadFile.addEventListener('change', function () {
    let reads = new FileReader();
    let file = this.files[0];
    console.log(file.name);
    if (!file.name || !file.name.endsWith('.sql')) {
        alert(`${file.name} not is sql file`);
        return;
    }
    reads.readAsText(file, 'utf-8');
    reads.onload = function (e) {
        uploadData = e.target.result;
    };
}, false);


const logDownload = document.getElementById("log_download");
logDownload.addEventListener('click', () => {
    cockpit.script("/root/.local/share/cockpit/backup/bin/output_log.sh").stream(() => { })
        .then(() => {
            return cockpit.file('/tmp/log.log', { max_read_size: maxReadSize }).read().then((data) => {
                let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
                saveAs(blob, `${new Date().getTime()}.log`)
            });
        })
        .catch(err => {
            console.error(err);
        });
})

// 国际化处理
let language = localStorage.getItem('cockpit.lang');
switch (language) {
    case 'zh-cn':
    case 'zh_CN':
        cockpit.locale({
            "": {
                language: "zh_CN",
            },
            "backup": [null, "备份恢复"],
            "sql_backup": [null, "SQL 备份"],
            "sql_restore": [null, "SQL 恢复"],
            "log_download": [null, "日志下载"],
            "download": [null, "下载"],
            "upload": [null, "上传"],
        })
        break;
    default:
        cockpit.locale({
            "": {
                language: "en_US",
            },
            "backup": [null, "Backup/Restore"],
            "sql_backup": [null, "SQL Backup"],
            "sql_restore": [null, "SQL Restore"],
            "log_download": [null, "Log Download"],
            "download": [null, "Download"],
            "upload": [null, "Upload"],
        })
        break;
}
cockpit.translate();


// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function () {
    console.log('language', cockpit);
});