const complaintTableBody = document.getElementById("complaintTableBody");
const inputTime = document.getElementById("inputTime");
const inputAddress = document.getElementById("inputAddress");
const inputDesc = document.getElementById("inputDesc");

async function getComplaints(){
    const httpResponse = await fetch("http://localhost:8080/complaints");
    const complaints = await httpResponse.json();
    return complaints;
}

async function renderComplaintTable(){

    const testComplaints = await getComplaints();

    const result = testComplaints.filter(complaint => complaint.status === "HIGH_PRIORITY" || complaint.status === "LOW_PRIORITY").filter(complaint => complaint.meetingId === -1);

    for(const complaint of result){

        const complaintRow = document.createElement("tr");

        const complaintAdd = document.createElement("input");
        complaintAdd.type = "checkbox";
        complaintAdd.name = "name";
        complaintAdd.value = "value";
        complaintAdd.id = "id";
        complaintAdd.dataset.complaintId = complaint.complaintId;

        const complaintIdData = document.createElement("td");
        complaintIdData.innerText = complaint.complaintId;

        const complaintDescData = document.createElement("td");
        complaintDescData.innerText = complaint.complaintDesc;

        const complaintStatusData = document.createElement("td");
        complaintStatusData.innerText = complaint.status;

        complaintRow.appendChild(complaintAdd);
        complaintRow.appendChild(complaintIdData);
        complaintRow.appendChild(complaintDescData);
        complaintRow.appendChild(complaintStatusData);

        complaintTableBody.appendChild(complaintRow);
    }
}

renderComplaintTable();

document.addEventListener("submit", async event => {
    event.preventDefault();

    const timeDate = new Date(inputTime.value);
    const timeEpoch = timeDate.getTime()/1000.0;

    const time = timeEpoch;
    const address = inputAddress.value;
    const meetingDesc = inputDesc.value;

    const meeting = {meetingId:0, address, time, meetingDesc};

    const response = await fetch("http://localhost:8080/meetings", {
        method:"POST",
        body: JSON.stringify(meeting),
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if(response.status === 201){
        console.log("Meeting successfully created.");

        const meetingBody = await response.json();

        const meetingIdDs = meetingBody.meetingId;

        for(element of complaintTableBody.children){
            const complaintCheck = element.firstChild;

            if(complaintCheck.checked){
                const complaintId = complaintCheck.dataset.complaintId;
                const response = await fetch(`http://localhost:8080/complaints/${complaintId}/meetings/${meetingIdDs}`, {
                method:"PATCH",
                body: JSON.stringify(complaintId, meetingIdDs),
                headers:{
                    "Content-Type":"application/json"
                }
            });
                if (response.status === 202){

                    console.log("Success.");

                }else{

                    console.log("Failure.");

                } 
            }
        }
        alert("Meeting successfully created.");
        inputTime.value = "";
        inputAddress.value = "";
        inputDesc.value = "";
    }else{
        console.log("Something went wrong.");
    }

});