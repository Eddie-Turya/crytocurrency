// Date and Time Display
function updateDateTime() {
    const datetime = document.getElementById('datetime');
    const now = new Date();
    datetime.innerHTML = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

// Coin Data Fetching (Using CoinGecko API)
const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=24&page=1&sparkline=false';
const coinTableBody = document.getElementById('coin-data');

// Fetch data from CoinGecko API
fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(coin => {
            const row = document.createElement('tr');

            // Coin + Logo column
            const coinCell = document.createElement('td');
            coinCell.classList.add('coin');
            
            const logoImg = document.createElement('img');
            logoImg.src = coin.image;
            logoImg.alt = `${coin.name} logo`;
            logoImg.width = 25; // Ensure proper size of logos
            logoImg.height = 25;

            const coinName = document.createElement('span');
            coinName.innerText = coin.name;
            
            coinCell.appendChild(logoImg);
            coinCell.appendChild(coinName);

            // Latest Price column
            const priceCell = document.createElement('td');
            priceCell.innerText = `$${coin.current_price.toFixed(2)}`;

            // 24h Change column
            const changeCell = document.createElement('td');
            changeCell.innerText = `${coin.price_change_percentage_24h.toFixed(2)}%`;
            changeCell.classList.add(coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative');

            // Volume (24h) column
            const volumeCell = document.createElement('td');
            volumeCell.innerText = `$${coin.total_volume.toLocaleString()}`;

            // Append all cells to the row
            row.appendChild(coinCell);
            row.appendChild(priceCell);
            row.appendChild(changeCell);
            row.appendChild(volumeCell);

            // Append row to the table
            coinTableBody.appendChild(row);
        });
    })
    .catch(error => console.log('Error fetching coin data:', error));

// TradingView Widget
new TradingView.widget({
    "width": "100%",
    "height": "300", // Reduced height to fit better on the page
    "symbol": "BINANCE:BTCUSDT",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "light",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "container_id": "tradingview_chart"
});
