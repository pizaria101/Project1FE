const complaintTableBody = document.getElementById("complaintTableBody");

    async function getComplaints(){
        const httpResponse = await fetch("https://schulte-app.proudsea-316ea47b.eastus.azurecontainerapps.io/complaints");
        const complaints = await httpResponse.json();
        return complaints;
    }

    async function renderComplaintTable(){

        const testComplaints = await getComplaints();

        const result = testComplaints.filter(complaint => complaint.status === "UNREVIEWED");

        for(const complaint of result){

            const complaintRow = document.createElement("tr");

            const complaintIdData = document.createElement("td");
            complaintIdData.innerText = complaint.complaintId;

            const complaintDescData = document.createElement("td");
            complaintDescData.innerText = complaint.complaintDesc;

            const complaintStatusData = document.createElement("td");
            complaintStatusData.innerText = complaint.status;

            const complaintHighBtn = document.createElement("button");
            complaintHighBtn.innerText = "High Priority";
            
            complaintHighBtn.dataset.complaintId = complaint.complaintId;
            complaintHighBtn.dataset.status = "high";

            const complaintLowBtn = document.createElement("button");
            complaintLowBtn.innerText = "Low Priority";

            complaintLowBtn.dataset.complaintId = complaint.complaintId;
            complaintLowBtn.dataset.status = "low";

            const complaintIgnoreBtn = document.createElement("button");
            complaintIgnoreBtn.innerText = "Ignore";

            complaintIgnoreBtn.dataset.complaintId = complaint.complaintId;
            complaintIgnoreBtn.dataset.status = "ignore";
            
            complaintHighBtn.addEventListener("click", async event => {

                event.preventDefault();

                const complaintIdDs = complaintHighBtn.dataset.complaintId;
                const statusDs = complaintHighBtn.dataset.status;

                const response = await fetch(`https://schulte-app.proudsea-316ea47b.eastus.azurecontainerapps.io/complaints/${complaintIdDs}/${statusDs}`, {
                    method:"PATCH",
                    body: JSON.stringify(complaintIdDs, statusDs),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                    if (response.status === 202){

                        alert("Status changed.");

                    }else if (response.status === 304){

                        alert("Status not changed.");

                    }
                    location.reload();
                }
            );

            complaintLowBtn.addEventListener("click", async event => {

                event.preventDefault();

                const complaintIdDs = complaintLowBtn.dataset.complaintId;
                const statusDs = complaintLowBtn.dataset.status;

                const response = await fetch(`https://schulte-app.proudsea-316ea47b.eastus.azurecontainerapps.io/complaints/${complaintIdDs}/${statusDs}`, {
                    method: "PATCH",
                    body: JSON.stringify(complaintIdDs, statusDs),
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                    if (response.status === 202) {

                        alert("Status changed.");

                    } else if (response.status === 304) {

                        alert("Status not changed.");

                    }
                    location.reload();
                }
            );

            complaintIgnoreBtn.addEventListener("click", async event => {

                event.preventDefault();

                const complaintIdDs = complaintIgnoreBtn.dataset.complaintId;
                const statusDs = complaintIgnoreBtn.dataset.status;

                const response = await fetch(`https://schulte-app.proudsea-316ea47b.eastus.azurecontainerapps.io/complaints/${complaintIdDs}/${statusDs}`, {
                    method:"PATCH",
                    body: JSON.stringify(complaintIdDs, statusDs),
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                    if (response.status === 202){

                        alert("Status changed.");

                    }else if (response.status === 304){

                        alert("Status not changed.");

                    }
                    location.reload();
                }
            );

            complaintRow.appendChild(complaintIdData);
            complaintRow.appendChild(complaintDescData);
            complaintRow.appendChild(complaintStatusData);
            complaintRow.appendChild(complaintHighBtn);
            complaintRow.appendChild(complaintLowBtn);
            complaintRow.appendChild(complaintIgnoreBtn);

            complaintTableBody.appendChild(complaintRow);
        }
    }

    renderComplaintTable();