
async function submitRank() {
    const name = document.getElementById('name').value;
    const count = document.getElementById('count').innerText;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, count })
    });
    if (response.ok) {
        alert('提交成功！');
    } else {
        alert('提交失败，请稍后再试。');
    }
}

async function loadLeaderboard() {
    document.getElementById("leaderboard").style.display = "flex";
    const response = await fetch('/leaderboard');
    const data = await response.json();

    const tbody = document.querySelector('#leaderboard tbody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.ID}</td>
            <td>${item.REGION}</td>
            <td>${item.NAME}</td>
            <td>${item.TIME}</td>
            <td>${item.COUNT}</td>
        `;
        tbody.appendChild(row);
    });
}