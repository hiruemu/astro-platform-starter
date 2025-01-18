// script.js
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['expenses', 'years', 'withdrawal', 'return'].map(id => 
        document.getElementById(id));
    const [targetAmountEl, requiredAmountEl] = 
        ['targetAmount', 'requiredAmount'].map(id => document.getElementById(id));
    const shareButton = document.getElementById('shareButton');

    function calculateResults() {
        const [expenses, years, withdrawal, returnRate] = inputs.map(input => 
            parseFloat(input.value));
        
        const wRate = withdrawal / 100;
        const rRate = returnRate / 100;
        
        const targetAmount = expenses / wRate;
        const requiredAmount = targetAmount / Math.pow(1 + rRate, years);
        
        return {
            target: Math.round(targetAmount).toLocaleString(),
            required: Math.round(requiredAmount).toLocaleString()
        };
    }

    function updateResults() {
        const results = calculateResults();
        targetAmountEl.textContent = results.target + '万円';
        requiredAmountEl.textContent = results.required + '万円';
    }

    async function handleShare() {
        const results = calculateResults();
        const [expenses, years, withdrawal, returnRate] = inputs.map(input => 
            input.value);
        
        const shareText = `
🏝️ コーストFIRE計算結果

📊 入力条件
・年間生活費: ${expenses}万円
・リタイアまでの年数: ${years}年
・引き出し率: ${withdrawal}%
・運用利回り: ${returnRate}%

💰 計算結果
・リタイア時に必要な資産: ${results.target}万円
・現在必要な資産: ${results.required}万円

#コーストFIRE #資産形成 #FIRE野郎
`;

        if (navigator.share) {
            try {
                await navigator.share({
                    text: shareText
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // フォールバック: クリップボードにコピー
            navigator.clipboard.writeText(shareText);
            alert('結果をクリップボードにコピーしました！');
        }
    }

    // イベントリスナーの設定
    inputs.forEach(input => {
        input.addEventListener('input', updateResults);
    });
    
    shareButton.addEventListener('click', handleShare);

    // 初回計算
    updateResults();
});