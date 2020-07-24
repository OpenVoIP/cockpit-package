const dataDownload = document.getElementById("data_download");
dataDownload.addEventListener("click", () => {
    cockpit.script("/root/.local/share/cockpit/backup/bin/back_db.sh").stream(()=>{
       
    })
    .then(()=>{
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
    cockpit.file('/tmp/sql.sql').replace(uploadData).then((data) => {
        console.log(data);
    }).catch(err => {
        console.error(err);
    });
});


let uploadFile = document.getElementById('upload_file');
uploadFile.addEventListener('change', function() {
    let reads = new FileReader();
    let file = this.files[0];
    reads.readAsText(file, 'utf-8');
    reads.onload = function (e) {
        uploadData = e.target.result;
    };
    console.log(file.name);
}, false);

const logDownload = document.getElementById("log_download");
logDownload.addEventListener('click', () => {
    cockpit.spawn(["ping", "-c", "4", address.value])
        .stream(ping_output)
        .then(ping_success)
        .catch(ping_fail);
})

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function () { });
