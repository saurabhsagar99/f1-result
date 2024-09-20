const apiUrl = "https://ergast.com/api/f1/current/last/results.json";

async function fetchRaceData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        const raceInfo = data.MRData.RaceTable.Races[0];
        const raceName = raceInfo.raceName;
        const raceDate = raceInfo.date;
        const raceStatus = `Race Date: ${raceDate}`;
        
        const leaderboard = raceInfo.Results.map(result => ({
            position: result.position,
            driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
            team: result.Constructor.name
        }));
        
        updateRaceInfo(raceName, raceStatus, leaderboard);
        
    } catch (error) {
        console.error("Error fetching race data:", error);
        document.getElementById("race-name").textContent = "Failed to load race data";
        document.getElementById("race-status").textContent = "No race information available";
    }
}


function updateRaceInfo(raceName, raceStatus, leaderboard) {
    document.getElementById("race-name").textContent = raceName;
    document.getElementById("race-status").textContent = raceStatus;

    let leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = ''; 

    leaderboard.forEach(driver => {
        let listItem = document.createElement("li");
        listItem.textContent = `${driver.position}. ${driver.driver} (${driver.team})`;
        leaderboardElement.appendChild(listItem);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    fetchRaceData();
});
