document.getElementById("subscribe_bt").addEventListener("click", () => {
    const email = document.getElementById("email_subscribe").value
    
    const data = {"Email": email}

    axios.post("https://ux0eruuwu7.execute-api.us-east-1.amazonaws.com/prod/subscribetopic", JSON.stringify(data))
    .then(res => {
        console.log(res["data"]["subscription_arn"])
        const response = res["data"]["subscription_arn"]
        if(response == "pending confirmation") {
            alert("Please check your email to confirm subscription")
        }
        else {
            alert("You have subscribed to NYP Lost and Found")
        }
    })
})