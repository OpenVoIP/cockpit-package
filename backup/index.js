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
dataUpload.addEventListener("click", () => {

    cockpit.file('/var/log/kern.log').write().then((data) => {
        let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "log.log");
    }).catch(err => {
        console.error(err);
    });
});

const logDownload = document.getElementById("log_download");
logDownload.addEventListener('click', () => {
    cockpit.spawn(["ping", "-c", "4", address.value])
        .stream(ping_output)
        .then(ping_success)
        .catch(ping_fail);
})

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function () { });
