const dataDownload = document.getElementById("data_download");
dataDownload.addEventListener("click", () => {
    cockpit.script("/root/.local/share/cockpit/backup/bin/back_db.sh").stream(() => {})
        .then(() => {
            return cockpit.file('/tmp/sql.sql').read().then((data) => {
                let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
                saveAs(blob, "coopaging.sql")
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
        return cockpit.script("/root/.local/share/cockpit/backup/bin/import_db.sh").stream(() => {});
    }).catch(err => {
        console.error(err);
    });
});


let uploadFile = document.getElementById('upload_file');
uploadFile.addEventListener('change', function () {
    let reads = new FileReader();
    let file = this.files[0];
    console.log(file.name);
    if(!file.name || !file.name.endsWith('.sql')){
        return alert(`${file.name} not is sql file`);
    }
    reads.readAsText(file, 'utf-8');
    reads.onload = function (e) {
        uploadData = e.target.result;
    };
}, false);


const logDownload = document.getElementById("log_download");
logDownload.addEventListener('click', () => {
    return cockpit.file('/var/log/message').read().then((data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "message.log")
    });
})

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function () { });
