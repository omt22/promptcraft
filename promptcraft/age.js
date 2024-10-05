document.getElementById("ageForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the date of birth from the input
    const dob = new Date(document.getElementById("dob").value);
    const today = new Date();

    // Calculate the age in years
    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    // Adjust for negative days
    if (ageDays < 0) {
        ageMonths--;
        // Get the last day of the previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate();
    }

    // Adjust for negative months
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display the result
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
});
