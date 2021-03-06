
const maxReadSize = 50 * 1024 * 1024;

const dataDownload = document.getElementById("data_download");
const result = document.getElementById("select_file");

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
    if(!uploadData){
        return alert(`select file`);
    }
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
    
    if (!file.name || !file.name.endsWith('.sql')) {
        alert(`${file.name} not is sql file`);
        return;
    }
    
    result.innerHTML = file.name;
    result.style.color = "green";

    reads.readAsText(file, 'utf-8');
    reads.onload = function (e) {
        uploadData = e.target.result;
    };
});


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
            result.innerHTML = "Upload Failure";
            result.style.color = "red";
        });
})


// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function () {
    // console.log('language', cockpit);
});

cockpit.translate();
