const dataDownload = document.getElementById("data_download");
button.addEventListener("click", () => {
    cockpit.read()
});

const dataUpload = document.getElementById("data_upload");
const logDownload = document.getElementById("log_download");
logDownload.addEventListener('click', () => {
    cockpit.spawn(["ping", "-c", "4", address.value])
        .stream(ping_output)
        .then(ping_success)
        .catch(ping_fail);
})

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
