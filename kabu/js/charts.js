// 株式市場情報ポータル - チャートと分析機能
// アーキテクチャルデザインに最適化されたビジュアライゼーション

document.addEventListener('DOMContentLoaded', function() {
  // ダークモードにチャートを適応
  Chart.defaults.color = 'rgba(148, 163, 184, 0.8)';
  Chart.defaults.borderColor = 'rgba(30, 41, 59, 0.5)';
  
  // 各機能のセットアップ
  setupTabs();
  initializeCharts();
  displayStockData();
  displayMarketSummary();
  displayStockReports();
  setupAIReportGeneration();
  setupMarketForecastTabs();
  setupPortfolioManager();
  setupHotStocksFilters();
  setupStockDetailButtons();
  
  // アニメーションエフェクトを追加
  animateElements();
});

// UI要素のアニメーション
function animateElements() {
  // カード要素を少し遅延させて表示
  const cards = document.querySelectorAll('.stock-card, .summary-card, .report-card, .news-item, .trend-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });
}

// 銘柄詳細ボタン処理の設定
function setupStockDetailButtons() {
  // 全ての銘柄カードにボタンを追加
  const stockCards = document.querySelectorAll('.hot-stock-card');
  
  stockCards.forEach(card => {
    // 銘柄情報を取得
    const stockCode = card.querySelector('.stock-code').textContent;
    const stockName = card.querySelector('.stock-name').textContent;
    
    // ボタン用のコンテナを作成
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'stock-buttons';
    
    // 詳細レポートボタン
    const reportButton = document.createElement('button');
    reportButton.className = 'stock-button report-button';
    reportButton.textContent = '詳細な個別レポート';
    reportButton.setAttribute('data-code', stockCode);
    reportButton.setAttribute('data-name', stockName);
    
    // ホームページボタン
    const homepageButton = document.createElement('a');
    homepageButton.className = 'stock-button homepage-button';
    homepageButton.textContent = 'ホームページ';
    homepageButton.setAttribute('target', '_blank');
    
    // URLを銘柄コードに基づいて設定（実際のURLは仮のもの）
    // 実際の本番環境では各企業の正確なURLを使用するべきです
    let companyUrl;
    switch(stockCode) {
      case '4689': companyUrl = 'https://www.z-holdings.co.jp/'; break;
      case '9613': companyUrl = 'https://www.nttdata.com/jp/ja/'; break;
      case '8035': companyUrl = 'https://www.tel.co.jp/'; break;
      case '7267': companyUrl = 'https://www.honda.co.jp/'; break;
      case '8306': companyUrl = 'https://www.mufg.jp/'; break;
      case '4568': companyUrl = 'https://www.daiichisankyo.co.jp/'; break;
      case '1801': companyUrl = 'https://www.taisei.co.jp/'; break;
      case '3382': companyUrl = 'https://www.7andi.com/'; break;
      case '6701': companyUrl = 'https://jpn.nec.com/'; break;
      case '1605': companyUrl = 'https://www.inpex.co.jp/'; break;
      case '4005': companyUrl = 'https://www.sumitomo-chem.co.jp/'; break;
      case '8802': companyUrl = 'https://www.mec.co.jp/'; break;
      case '2897': companyUrl = 'https://www.nissin.com/jp/'; break;
      case '9142': companyUrl = 'https://www.jrkyushu.co.jp/'; break;
      case '9697': companyUrl = 'https://www.capcom.co.jp/'; break;
      case '8766': companyUrl = 'https://www.tokiomarinehd.com/'; break;
      case '6594': companyUrl = 'https://www.nidec.com/jp/'; break;
      case '7012': companyUrl = 'https://www.khi.co.jp/'; break;
      case '9202': companyUrl = 'https://www.ana.co.jp/'; break;
      case '9983': companyUrl = 'https://www.fastretailing.com/jp/'; break;
      default: companyUrl = `https://stocks.finance.yahoo.co.jp/stocks/detail/?code=${stockCode}.T`; 
    }
    
    homepageButton.href = companyUrl;
    
    // ボタンをコンテナに追加
    buttonContainer.appendChild(reportButton);
    buttonContainer.appendChild(homepageButton);
    
    // カードにボタンコンテナを追加
    card.appendChild(buttonContainer);
    
    // 詳細レポートボタンのイベントリスナーを追加
    reportButton.addEventListener('click', () => {
      showStockDetailReport(stockCode, stockName);
    });
  });
}

// 銘柄の詳細レポートを表示する関数
function showStockDetailReport(stockCode, stockName) {
  // AIレポートタブを表示
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // 現在のアクティブタブをリセット
  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  
  // AIレポートタブを選択
  const reportsTabButton = document.querySelector('.tab-button[data-tab="reports-tab"]');
  const reportsTabContent = document.getElementById('reports-tab');
  
  reportsTabButton.classList.add('active');
  reportsTabContent.classList.add('active');
  
  // スクロールして表示
  reportsTabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // 銘柄コードを入力欄に設定
  const stockCodeInput = document.getElementById('stock-code');
  stockCodeInput.value = stockCode;
  
  // AIレポート生成ボタンをクリック
  const generateReportButton = document.getElementById('generate-report');
  generateReportButton.click();
}

// タブ切り替え機能のセットアップ
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブなタブをリセット
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // クリックされたタブをアクティブにする
      button.classList.add('active');
      const targetTab = document.getElementById(button.dataset.tab);
      targetTab.classList.add('active');
      
      // 表示されたタブの要素をアニメーション
      animateElements();
    });
  });
}

// 市場見通しの小タブ機能のセットアップ
function setupMarketForecastTabs() {
  const forecastTabs = document.querySelectorAll('.forecast-tab');
  const forecastContents = document.querySelectorAll('.forecast-content');
  
  forecastTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // アクティブなタブをリセット
      forecastTabs.forEach(t => t.classList.remove('active'));
      forecastContents.forEach(content => content.classList.remove('active'));
      
      // クリックされたタブをアクティブにする
      tab.classList.add('active');
      const targetContent = document.getElementById(tab.dataset.target);
      targetContent.classList.add('active');
      
      // 表示された要素をアニメーション
      animateElements();
    });
  });
}

// チャートの初期化
function initializeCharts() {
  // タイトルの設定を共通化
  const titleConfig = {
    display: true,
    font: {
      family: "'Space Grotesk', 'Noto Sans JP', sans-serif",
      weight: '600',
      size: 16
    },
    color: 'rgba(226, 232, 240, 0.9)',
    padding: {
      bottom: 20
    }
  };
  
  const tooltipConfig = {
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
    titleColor: '#10b981',
    bodyColor: '#e2e8f0',
    borderColor: 'rgba(99, 102, 241, 0.3)',
    borderWidth: 1,
    padding: 12,
    boxWidth: 10,
    boxHeight: 10,
    boxPadding: 3,
    usePointStyle: true,
    cornerRadius: 6,
    caretSize: 6,
    bodyFont: {
      family: "'Inter', 'Noto Sans JP', sans-serif"
    },
    titleFont: {
      family: "'Space Grotesk', 'Noto Sans JP', sans-serif",
      weight: 'bold'
    }
  };
  
  // 日経平均株価のグラデーション
  const nikkeiCtx = document.getElementById('nikkei-chart').getContext('2d');
  const nikkeiGradient = nikkeiCtx.createLinearGradient(0, 0, 0, 400);
  nikkeiGradient.addColorStop(0, 'rgba(99, 102, 241, 0.2)');
  nikkeiGradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
  
  // 日経平均チャート
  const nikkeiChart = new Chart(nikkeiCtx, {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [{
        label: '日経平均株価',
        data: [30000, 31200, 29800, 30500, 32000, 31500, 33000, 32500, 34000, 35000, 34500, 36000],
        backgroundColor: nikkeiGradient,
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2.5,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            color: '#e2e8f0',
            font: {
              family: "'Poppins', 'Noto Sans JP', sans-serif",
              weight: 'bold',
              size: 12
            },
            boxWidth: 12,
            boxHeight: 12,
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: tooltipConfig,
        title: {
          ...titleConfig,
          text: '日経平均株価チャート (¥)',
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(30, 41, 59, 0.5)',
            borderDash: [4, 4]
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString() + '円';
            },
            padding: 8,
            font: {
              family: "'Space Grotesk', 'Noto Sans JP', sans-serif",
              size: 11
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(30, 41, 59, 0.3)',
            drawOnChartArea: false
          },
          ticks: {
            padding: 8,
            font: {
              family: "'Inter', 'Noto Sans JP', sans-serif",
              size: 11
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      elements: {
        line: {
          borderCapStyle: 'round',
          borderJoinStyle: 'round'
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  });
  
  // TOPIX指数のグラデーション
  const topixCtx = document.getElementById('topix-chart').getContext('2d');
  const topixGradient = topixCtx.createLinearGradient(0, 0, 0, 400);
  topixGradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
  topixGradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
  
  // TOPIX指数のチャート
  const topixChart = new Chart(topixCtx, {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      datasets: [{
        label: 'TOPIX指数',
        data: [2100, 2150, 2080, 2120, 2200, 2180, 2250, 2230, 2300, 2350, 2320, 2400],
        backgroundColor: topixGradient,
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2.5,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: 'rgba(16, 185, 129, 1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            color: '#e2e8f0',
            font: {
              family: "'Poppins', 'Noto Sans JP', sans-serif",
              weight: 'bold',
              size: 12
            },
            boxWidth: 12,
            boxHeight: 12,
            padding: 15,
            usePointStyle: true
          }
        },
        tooltip: tooltipConfig,
        title: {
          ...titleConfig,
          text: 'TOPIX指数チャート',
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(30, 41, 59, 0.5)',
            borderDash: [4, 4]
          },
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            },
            padding: 8,
            font: {
              family: "'Space Grotesk', 'Noto Sans JP', sans-serif",
              size: 11
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(30, 41, 59, 0.3)',
            drawOnChartArea: false
          },
          ticks: {
            padding: 8,
            font: {
              family: "'Inter', 'Noto Sans JP', sans-serif",
              size: 11
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      elements: {
        line: {
          borderCapStyle: 'round',
          borderJoinStyle: 'round'
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
        delay: 300
      }
    }
  });
}

// 株価データの表示
function displayStockData() {
  const stockData = [
    { code: '7203', name: 'トヨタ自動車', price: 2450, change: 35, changePercent: 1.45, volume: 3257400 },
    { code: '6758', name: 'ソニーグループ', price: 12800, change: -120, changePercent: -0.93, volume: 1548700 },
    { code: '9432', name: 'NTT', price: 4250, change: 75, changePercent: 1.8, volume: 4562800 },
    { code: '9984', name: 'ソフトバンクグループ', price: 6700, change: -85, changePercent: -1.25, volume: 2985600 },
    { code: '6861', name: 'キーエンス', price: 67300, change: 1200, changePercent: 1.82, volume: 124500 },
    { code: '8306', name: '三菱UFJフィナンシャル・グループ', price: 1150, change: 23, changePercent: 2.04, volume: 12568900 }
  ];
  
  const stockGrid = document.querySelector('.stock-grid');
  stockData.forEach((stock, index) => {
    const isUp = stock.change >= 0;
    const stockCard = document.createElement('div');
    stockCard.className = 'stock-card';
    stockCard.style.animationDelay = `${index * 0.1}s`;
    
    const volumeFormatted = stock.volume.toLocaleString();
    
    stockCard.innerHTML = `
      <div class="stock-code">${stock.code}</div>
      <div class="stock-name">${stock.name}</div>
      <div class="stock-price">¥${stock.price.toLocaleString()}</div>
      <div class="stock-change ${isUp ? 'up' : 'down'}">
        ${isUp ? '▲' : '▼'} ${Math.abs(stock.change).toLocaleString()} (${Math.abs(stock.changePercent).toFixed(2)}%)
      </div>
      <div style="margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary);">
        出来高: ${volumeFormatted}株
      </div>
    `;
    stockGrid.appendChild(stockCard);
  });
}

// 市場概況の表示
function displayMarketSummary() {
  const marketData = [
    { name: '日経平均株価', value: '36,025.53', change: '+235.31', percent: '+0.66%', trend: '5日連続上昇' },
    { name: 'TOPIX', value: '2,532.12', change: '+12.56', percent: '+0.50%', trend: '3日続伸' },
    { name: 'JPX日経400', value: '22,745.28', change: '+105.42', percent: '+0.47%', trend: '年初来高値' },
    { name: '東証REIT指数', value: '2,015.32', change: '-8.21', percent: '-0.41%', trend: '3日続落' }
  ];
  
  const marketSummary = document.querySelector('.market-summary');
  marketData.forEach((item, index) => {
    const isUp = !item.change.includes('-');
    const summaryCard = document.createElement('div');
    summaryCard.className = 'summary-card';
    summaryCard.style.animationDelay = `${index * 0.1}s`;
    
    summaryCard.innerHTML = `
      <div class="summary-title">${item.name}</div>
      <div class="summary-value">${item.value}</div>
      <div class="summary-change ${isUp ? 'up' : 'down'}">
        ${item.change} (${item.percent})
      </div>
      <div style="margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary);">
        ${item.trend}
      </div>
    `;
    marketSummary.appendChild(summaryCard);
  });
  
  // 市場予測コンテンツの表示 - 1ヵ月後
  displayOneMonthForecast();
  
  // 市場予測コンテンツの表示 - 3ヵ月後
  displayThreeMonthForecast();
  
  // 市場予測コンテンツの表示 - 12ヶ月後
  displayTwelveMonthForecast();
}

// 1ヵ月後の市場予測を表示
function displayOneMonthForecast() {
  const trendData = [
    { label: '日経平均予想レンジ', value: '36,500 〜 37,800', description: '企業の第3四半期決算発表を受けて上値を試す展開が予想されます。特にハイテク関連やAI関連銘柄の決算内容が市場をけん引する見通しです。' },
    { label: '想定ボラティリティ', value: '中', description: '決算発表シーズンであることから、個別銘柄のボラティリティは高まりますが、指数全体としては比較的安定した推移が見込まれます。' },
    { label: '注目セクター', value: 'テクノロジー / 金融', description: 'テクノロジーセクターは決算を受けた物色が活発化する見込み。金融セクターは世界的な金利動向を睨みながらも堅調な推移が期待されます。' }
  ];
  
  const containerOne = document.getElementById('forecast-one-month');
  
  const trendSection = document.createElement('div');
  trendSection.className = 'market-trend';
  
  trendData.forEach((item, index) => {
    const trendCard = document.createElement('div');
    trendCard.className = 'trend-card';
    trendCard.innerHTML = `
      <div class="trend-label">${item.label}</div>
      <div class="trend-value">${item.value}</div>
      <div class="trend-description">${item.description}</div>
    `;
    trendSection.appendChild(trendCard);
  });
  
  containerOne.appendChild(trendSection);
  
  // 主要経済指標
  const indicatorsSection = document.createElement('div');
  indicatorsSection.className = 'forecast-section';
  indicatorsSection.innerHTML = `
    <div class="forecast-subtitle">注目経済指標（今後1ヵ月）</div>
    <table class="forecast-table">
      <thead>
        <tr>
          <th>指標</th>
          <th>発表日</th>
          <th>予想値</th>
          <th>前回値</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>日銀金融政策決定会合</td>
          <td>2月16日</td>
          <td>政策金利維持濃厚</td>
          <td>-0.1％〜0.0％</td>
        </tr>
        <tr>
          <td>米国雇用統計</td>
          <td>2月3日</td>
          <td>非農業部門+16.5万人</td>
          <td>+21.6万人</td>
        </tr>
        <tr>
          <td>国内GDP速報値（10-12月期）</td>
          <td>2月10日</td>
          <td>前期比+0.3％</td>
          <td>前期比-0.7％</td>
        </tr>
      </tbody>
    </table>
  `;
  containerOne.appendChild(indicatorsSection);
  
  // 重要ポイント
  const keyPointsSection = document.createElement('div');
  keyPointsSection.className = 'forecast-key-points';
  keyPointsSection.innerHTML = `
    <div class="key-points-title">1ヵ月の重要ポイント</div>
    <ul class="key-points-list">
      <li>企業の決算発表による市場の方向性確認が最重要ポイント <span class="impact-level impact-high">影響大</span></li>
      <li>日銀の金融政策スタンスに変化があるか注視が必要</li>
      <li>米国の経済指標から景気減速の兆候があるかを確認</li>
      <li>中国の春節後の経済活動再開による影響を観察</li>
    </ul>
  `;
  containerOne.appendChild(keyPointsSection);
}

// 3ヵ月後の市場予測を表示
function displayThreeMonthForecast() {
  const trendData = [
    { label: '日経平均予想レンジ', value: '36,000 〜 39,000', description: '年度末の需給要因を過ぎると、新年度の業績見通しや経済政策への期待から、中長期の上昇トレンドが強まる可能性があります。' },
    { label: '想定ボラティリティ', value: '中〜高', description: '期間を通じて、世界的な金融政策の方向性確認や地政学リスクの影響で、一時的なボラティリティ上昇局面が想定されます。' },
    { label: '注目セクター', value: '製造業 / ヘルスケア', description: '世界的なサプライチェーンの正常化進展で製造業の業績回復期待が高まり、春先からのヘルスケア関連の需要増加も見込まれます。' }
  ];
  
  const containerThree = document.getElementById('forecast-three-month');
  
  const trendSection = document.createElement('div');
  trendSection.className = 'market-trend';
  
  trendData.forEach((item, index) => {
    const trendCard = document.createElement('div');
    trendCard.className = 'trend-card';
    trendCard.innerHTML = `
      <div class="trend-label">${item.label}</div>
      <div class="trend-value">${item.value}</div>
      <div class="trend-description">${item.description}</div>
    `;
    trendSection.appendChild(trendCard);
  });
  
  containerThree.appendChild(trendSection);
  
  // 主要テーマ
  const themesSection = document.createElement('div');
  themesSection.className = 'forecast-section';
  themesSection.innerHTML = `
    <div class="forecast-subtitle">3ヵ月の主要テーマ</div>
    <table class="forecast-table">
      <thead>
        <tr>
          <th>テーマ</th>
          <th>影響度</th>
          <th>見通し</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>年度末の需給要因</td>
          <td><span class="impact-level impact-medium">中程度</span></td>
          <td>3月末にかけて一時的な需給の偏りが予想される</td>
        </tr>
        <tr>
          <td>新年度の企業業績見通し</td>
          <td><span class="impact-level impact-high">大</span></td>
          <td>全体としては増益基調継続の見込み</td>
        </tr>
        <tr>
          <td>米国の利下げペース</td>
          <td><span class="impact-level impact-high">大</span></td>
          <td>利下げペースの鈍化が市場の想定より早まる可能性</td>
        </tr>
        <tr>
          <td>日本の金融政策正常化</td>
          <td><span class="impact-level impact-medium">中程度</span></td>
          <td>追加利上げの可能性は低く、様子見姿勢が継続か</td>
        </tr>
      </tbody>
    </table>
  `;
  containerThree.appendChild(themesSection);
  
  // 重要ポイント
  const keyPointsSection = document.createElement('div');
  keyPointsSection.className = 'forecast-key-points';
  keyPointsSection.innerHTML = `
    <div class="key-points-title">3ヵ月の見通しポイント</div>
    <ul class="key-points-list">
      <li>企業の新年度業績見通しが予想以上に強気であれば、さらなる上値追いの展開へ <span class="impact-level impact-high">影響大</span></li>
      <li>米国の金融政策と経済指標のバランスが市場心理を左右</li>
      <li>国内では新NISA制度による資金流入効果が継続的に市場を支える</li>
      <li>地政学リスクの高まりに警戒が必要</li>
    </ul>
  `;
  containerThree.appendChild(keyPointsSection);
}

// 12ヵ月後の市場予測を表示
function displayTwelveMonthForecast() {
  const trendData = [
    { label: '日経平均予想レンジ', value: '35,000 〜 42,500', description: 'グローバル経済の回復基調と日本企業の継続的な構造改革、株主還元強化の流れから、中長期的に強気シナリオが優勢です。' },
    { label: '想定ボラティリティ', value: '高', description: '年内に実施される米国大統領選挙や地政学リスク、世界的な金融政策の調整過程で、複数回の調整局面が想定されます。' },
    { label: '注目セクター', value: 'AI関連 / 環境・エネルギー', description: 'AIの産業応用が進展する中でテクノロジー関連銘柄は堅調推移。持続可能なエネルギー転換を担う企業への注目度も高まる見込み。' }
  ];
  
  const containerTwelve = document.getElementById('forecast-twelve-month');
  
  const trendSection = document.createElement('div');
  trendSection.className = 'market-trend';
  
  trendData.forEach((item, index) => {
    const trendCard = document.createElement('div');
    trendCard.className = 'trend-card';
    trendCard.innerHTML = `
      <div class="trend-label">${item.label}</div>
      <div class="trend-value">${item.value}</div>
      <div class="trend-description">${item.description}</div>
    `;
    trendSection.appendChild(trendCard);
  });
  
  containerTwelve.appendChild(trendSection);
  
  // 長期シナリオ
  const scenariosSection = document.createElement('div');
  scenariosSection.className = 'forecast-section';
  scenariosSection.innerHTML = `
    <div class="forecast-subtitle">12ヵ月後のシナリオ分析</div>
    <table class="forecast-table">
      <thead>
        <tr>
          <th>シナリオ</th>
          <th>確率</th>
          <th>日経平均水準</th>
          <th>要因</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>強気シナリオ</td>
          <td>30%</td>
          <td>40,000〜42,500</td>
          <td>企業業績の継続的な向上、世界的な金融緩和の継続、日本企業の構造改革加速</td>
        </tr>
        <tr>
          <td>基本シナリオ</td>
          <td>55%</td>
          <td>37,000〜40,000</td>
          <td>緩やかな経済成長、企業収益の堅調な推移、資本効率改善の継続</td>
        </tr>
        <tr>
          <td>弱気シナリオ</td>
          <td>15%</td>
          <td>35,000以下</td>
          <td>世界経済の急減速、地政学的リスクの顕在化、金利上昇による企業業績悪化</td>
        </tr>
      </tbody>
    </table>
  `;
  containerTwelve.appendChild(scenariosSection);
  
  // 重要ポイント
  const keyPointsSection = document.createElement('div');
  keyPointsSection.className = 'forecast-key-points';
  keyPointsSection.innerHTML = `
    <div class="key-points-title">12ヵ月の重要変化要因</div>
    <ul class="key-points-list">
      <li>米国大統領選挙の結果と政策変更 <span class="impact-level impact-high">影響大</span></li>
      <li>生成AI技術の産業応用の本格的展開による社会構造変化</li>
      <li>日本企業のROE向上と構造改革の持続性</li>
      <li>日本の金融政策正常化プロセスの進展</li>
      <li>中国経済の長期的トレンド転換の可能性 <span class="impact-level impact-medium">影響中</span></li>
    </ul>
  `;
  containerTwelve.appendChild(keyPointsSection);
}

// 過去の個別株レポートの表示
function displayStockReports() {
  const reportData = [
    {
      title: 'トヨタ自動車（7203）- 好調な海外販売が業績を後押し',
      date: '2023年10月15日',
      content: 'トヨタ自動車は北米市場での販売が好調で、EVとハイブリッド車の販売が特に伸びています。為替の影響もあり、通期の業績予想を上方修正する見込みです。バッテリーEVの新モデル投入も計画されており、脱炭素化への取り組みを加速させています。',
      tags: ['自動車', '好決算', '配当増', 'EV戦略']
    },
    {
      title: 'ソニーグループ（6758）- エンタテインメント部門が成長をけん引',
      date: '2023年10月12日',
      content: 'ソニーグループはゲーム部門と音楽部門が好調で、特にPlayStation 5の販売台数が前年比30%増となりました。映画部門も複数のヒット作により収益に貢献しています。半導体事業のイメージセンサーも需要回復の兆しが見られます。',
      tags: ['エレクトロニクス', 'エンタメ', '成長株', 'AI活用']
    },
    {
      title: '任天堂（7974）- 次世代機への期待高まる',
      date: '2023年10月10日',
      content: '任天堂の次世代ゲーム機「Switch 2」の発売への期待が高まっています。アナリストは2024年中の発売を予想し、株価は上昇トレンドにあります。ソフトウェアラインナップも充実しており、年末商戦に向けて好材料となっています。',
      tags: ['ゲーム', 'ハードウェア', '新製品', 'IP戦略']
    }
  ];
  
  const reportList = document.querySelectorAll('.report-list')[1]; // 過去のレポートを表示する2つ目のreport-list
  reportData.forEach((report, index) => {
    const reportCard = document.createElement('div');
    reportCard.className = 'report-card';
    reportCard.style.animationDelay = `${index * 0.1}s`;
    
    let tagsHTML = '';
    report.tags.forEach(tag => {
      tagsHTML += `<span class="report-tag">${tag}</span>`;
    });
    
    reportCard.innerHTML = `
      <div class="report-header">
        <div class="report-title">${report.title}</div>
        <div class="report-date">${report.date}</div>
      </div>
      <div class="report-content">${report.content}</div>
      <div class="report-tags">${tagsHTML}</div>
    `;
    
    reportList.appendChild(reportCard);
  });
}

// AIレポート生成機能のセットアップ
function setupAIReportGeneration() {
  const generateButton = document.getElementById('generate-report');
  const stockCodeInput = document.getElementById('stock-code');
  const loadingIndicator = document.getElementById('loading-indicator');
  const aiReportResult = document.getElementById('ai-report-result');
  
  generateButton.addEventListener('click', () => {
    const stockCode = stockCodeInput.value.trim();
    
    if (!stockCode) {
      alert('証券コードまたは銘柄名を入力してください');
      return;
    }
    
    // 入力欄をクリアしてローディングを表示
    stockCodeInput.value = '';
    aiReportResult.innerHTML = '';
    loadingIndicator.classList.add('active');
    
    // AIレポート生成をシミュレート（実際はAPIリクエストになる）
    setTimeout(() => {
      loadingIndicator.classList.remove('active');
      
      // 銘柄情報を判定（単純化のため、入力に特定のキーワードが含まれるかチェック）
      let stockInfo;
      
      if (stockCode.includes('7203') || stockCode.toLowerCase().includes('トヨタ') || stockCode.toLowerCase().includes('toyota')) {
        stockInfo = {
          code: '7203',
          name: 'トヨタ自動車',
          price: 2450,
          change: 35,
          changePercent: 1.45,
          industry: '自動車',
          report: generateToyotaReport()
        };
      } else if (stockCode.includes('9984') || stockCode.toLowerCase().includes('ソフトバンク') || stockCode.toLowerCase().includes('softbank')) {
        stockInfo = {
          code: '9984',
          name: 'ソフトバンクグループ',
          price: 6700,
          change: -85,
          changePercent: -1.25,
          industry: '情報・通信',
          report: generateSoftbankReport()
        };
      } else if (stockCode.includes('6758') || stockCode.toLowerCase().includes('ソニー') || stockCode.toLowerCase().includes('sony')) {
        stockInfo = {
          code: '6758',
          name: 'ソニーグループ',
          price: 12800,
          change: -120,
          changePercent: -0.93,
          industry: 'エレクトロニクス',
          report: generateSonyReport()
        };
      } else {
        // その他の場合はランダムレポートを生成
        stockInfo = generateRandomStockReport(stockCode);
      }
      
      // レポート表示
      displayAIReport(stockInfo);
    }, 2000); // 2秒間のローディングをシミュレート
  });
  
  // Enterキーでも生成できるように
  stockCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      generateButton.click();
    }
  });
}

// トヨタ自動車のレポート生成
function generateToyotaReport() {
  return {
    summary: 'トヨタ自動車（7203）は、世界最大級の自動車メーカーであり、BEV・PHEV・HEV・FCEVなど多様なパワートレイン戦略を展開しています。中長期的に見て、強固な財務基盤と多角的な電動化戦略が、市場環境の変化に柔軟に対応できる強みとなっています。',
    
    financial: {
      title: '業績分析',
      content: '直近の四半期決算では、営業利益が前年同期比15.3%増の9,865億円となり、通期業績予想を上方修正しました。特に北米と欧州におけるSUVの販売好調とハイブリッド車の需要拡大が利益を押し上げています。為替変動の影響を除いた実質ベースでも増益となっており、事業の基礎体力が向上しています。'
    },
    
    technical: {
      title: 'テクニカル分析',
      content: '現在の株価は25日移動平均線を上回り、MACD（Moving Average Convergence Divergence）もゴールデンクロスを形成しており、短期的に上値を試す展開が予想されます。RSI（Relative Strength Index）は60前後で推移しており、まだ買われ過ぎの水準には達していません。'
    },
    
    outlook: {
      title: '今後の見通し',
      content: '世界的な電動化の加速に対して、トヨタのマルチパスアプローチ（複数の選択肢を並行して開発する戦略）は中長期的に優位性を発揮すると考えられます。特に急速充電インフラの整備が進んでいない新興国市場では、ハイブリッド技術の提供により環境対応と事業拡大の両立が期待できます。一方で、BEV開発の遅れに対する市場の懸念は引き続き株価の上値を抑える要因となる可能性があります。'
    },
    
    recommendation: {
      rating: '買い',
      targetPrice: '2,800円',
      potentialReturn: '14.3%',
      risk: '中'
    },
    
    catalysts: [
      '次世代BEVプラットフォームの発表',
      '北米市場でのシェア拡大',
      '配当増額の可能性'
    ],
    
    risks: [
      '中国市場での競争激化',
      '環境規制の更なる強化',
      '世界的な景気減速の影響'
    ]
  };
}

// ソフトバンクグループのレポート生成
function generateSoftbankReport() {
  return {
    summary: 'ソフトバンクグループ（9984）は、世界有数のテクノロジー投資会社として、AIや先端技術分野に積極的な投資を展開しています。ビジョンファンドを通じた投資先の価値変動が短期的な業績に大きな影響を与えるため、投資先の動向と市場環境を注視する必要があります。',
    
    financial: {
      title: '業績分析',
      content: '直近四半期では投資損失が改善し、純利益は黒字転換しました。特にARM社の米国上場成功が株主価値の向上に寄与しています。一方で、未上場投資先の評価減が継続しており、投資環境の改善ペースは緩やかです。財務レバレッジは依然として高い水準にあり、金利環境の変化に注意が必要です。'
    },
    
    technical: {
      title: 'テクニカル分析',
      content: '株価はボックス圏での推移が続いており、明確な方向性を欠いています。直近では200日移動平均線を下回る展開となっており、テクニカル面では弱含みです。出来高の減少も見られ、相場の停滞感を示唆しています。'
    },
    
    outlook: {
      title: '今後の見通し',
      content: 'AI関連投資の活性化に伴い、ビジョンファンドの投資先企業の価値上昇が期待されます。特に生成AI分野への投資拡大は中期的な成長ドライバーとなる可能性があります。ARM社の業績拡大も株式価値の向上に寄与するでしょう。一方で、グローバルな金融引き締めと投資環境の不透明感は、短期的なリスク要因として残ります。'
    },
    
    recommendation: {
      rating: '中立（様子見）',
      targetPrice: '7,200円',
      potentialReturn: '7.5%',
      risk: '高'
    },
    
    catalysts: [
      'ARM社の半導体設計事業拡大',
      'ビジョンファンド投資先のIPO実現',
      'AI関連投資の価値上昇'
    ],
    
    risks: [
      '金利上昇による負債コスト増加',
      '未上場投資先の評価減継続',
      '規制当局の監視強化'
    ]
  };
}

// ソニーグループのレポート生成
function generateSonyReport() {
  return {
    summary: 'ソニーグループ（6758）は、エレクトロニクス、エンターテイメント、金融サービスなど多角的な事業を展開するグローバル企業です。特にゲーム・音楽・映画などのエンターテイメント事業がグループ収益の中核となっており、IPコンテンツの価値最大化戦略が奏功しています。',
    
    financial: {
      title: '業績分析',
      content: '直近四半期の業績は、ゲーム&ネットワークサービス部門が牽引し、営業利益は前年同期比8.3%増となりました。PlayStation 5の販売台数は累計5,000万台を突破し、サブスクリプション収益も堅調に推移しています。一方、エレクトロニクス部門ではサプライチェーンの正常化とともに収益性が向上しています。映画・音楽事業も継続的な成長を示しています。'
    },
    
    technical: {
      title: 'テクニカル分析',
      content: '株価は52週高値圏で推移していましたが、直近では利益確定売りにより調整局面に入っています。移動平均線のゴールデンクロスが形成されており、中期的な上昇トレンドは維持されています。ボリンジャーバンドの拡大も見られ、ボラティリティの上昇が示唆されます。'
    },
    
    outlook: {
      title: '今後の見通し',
      content: 'PlayStation 5の販売拡大と高マージンのデジタルコンテンツ販売が、ゲーム部門の継続的な成長を支えるでしょう。また、AI技術の活用によるコンテンツ制作効率化や新サービス開発も中期的な成長要因となります。映画・音楽事業ではIPの多面展開によるシナジー効果が期待できます。一方、センサー事業はスマートフォン市場の成熟化による成長鈍化が懸念されますが、自動車向けなど新領域での展開が進んでいます。'
    },
    
    recommendation: {
      rating: '強気買い',
      targetPrice: '14,500円',
      potentialReturn: '13.3%',
      risk: '中'
    },
    
    catalysts: [
      'PlayStation VR2の普及拡大',
      'AIを活用したコンテンツ制作の革新',
      'IPクロスメディア展開の加速'
    ],
    
    risks: [
      'コンテンツ制作コストの上昇',
      'ゲーム市場における競争激化',
      'グローバル景気後退によるエンタメ支出の減少'
    ]
  };
}

// ランダムな株のレポート生成（任意の入力に対応するため）
function generateRandomStockReport(input) {
  // 入力から株式コードと名前を推測
  let code, name;
  
  // 入力が数字のみの場合は証券コードとみなす
  if (/^\d{4,5}$/.test(input)) {
    code = input;
    name = `${input}株式会社`;
  } else {
    // そうでなければ企業名とみなし、ランダムなコードを生成
    name = input;
    code = Math.floor(1000 + Math.random() * 8000).toString();
  }
  
  // ランダムな株価データ
  const price = Math.floor(1000 + Math.random() * 5000);
  const changePercent = (Math.random() * 4 - 2).toFixed(2); // -2%～+2%
  const change = Math.floor(price * changePercent / 100);
  
  // 業種をランダム選択
  const industries = ['情報・通信', '電気機器', '医薬品', '小売', '機械', '食品', '建設', '金融', '不動産', 'サービス'];
  const industry = industries[Math.floor(Math.random() * industries.length)];
  
  // レポート内容
  return {
    code: code,
    name: name,
    price: price,
    change: change,
    changePercent: parseFloat(changePercent),
    industry: industry,
    report: {
      summary: `${name}（${code}）は${industry}業界に属する企業です。AI分析では、業界動向と企業の財務データに基づいた評価を行います。中長期的な視点からの投資判断には、さらなる詳細分析が推奨されます。`,
      
      financial: {
        title: '業績分析',
        content: `直近の決算データによると、売上高は前年同期比${Math.floor(Math.random() * 15)}%${Math.random() > 0.5 ? '増' : '減'}、営業利益は${Math.floor(Math.random() * 20)}%${Math.random() > 0.6 ? '増' : '減'}となっています。${Math.random() > 0.5 ? '業界平均を上回る収益性を維持しており、堅調な業績推移が見られます。' : '業界内での競争激化により、収益性に若干の低下が見られます。'}`
      },
      
      technical: {
        title: 'テクニカル分析',
        content: `直近の株価動向では、${Math.random() > 0.5 ? '25日移動平均線を上回る展開となっており、短期的に強い動きとなっています。' : '主要移動平均線を下回る展開が続いており、弱含みの相場環境となっています。'}出来高は${Math.random() > 0.5 ? '増加傾向' : '減少傾向'}にあり、${Math.random() > 0.5 ? '投資家の関心が高まっています。' : '市場参加者の様子見姿勢が強まっています。'}`
      },
      
      outlook: {
        title: '今後の見通し',
        content: `${industry}業界全体では、${Math.random() > 0.7 ? '構造改革と技術革新が進み、成長機会が広がっています。' : 'コスト上昇圧力と競争激化により、厳しい環境が続くと予想されます。'}${name}については、${Math.random() > 0.5 ? '競争優位性を活かした成長戦略が奏功する可能性が高まっています。' : '事業構造の見直しと収益性改善が課題となっています。'}`
      },
      
      recommendation: {
        rating: ['買い', '中立', '中立', '中立', '売り'][Math.floor(Math.random() * 5)],
        targetPrice: `${Math.floor(price * (0.9 + Math.random() * 0.4))}円`,
        potentialReturn: `${(Math.random() * 20 - 10).toFixed(1)}%`,
        risk: ['低', '中', '中', '高'][Math.floor(Math.random() * 4)]
      },
      
      catalysts: [
        '新製品・サービスの展開',
        '海外市場での事業拡大',
        '業界再編による恩恵',
        'コスト構造の改善',
        '技術革新による競争力強化'
      ].sort(() => Math.random() - 0.5).slice(0, 3),
      
      risks: [
        '原材料価格の上昇',
        '競合他社との競争激化',
        '規制環境の変化',
        '景気後退の影響',
        '為替変動リスク',
        '人材確保の難しさ'
      ].sort(() => Math.random() - 0.5).slice(0, 3)
    }
  };
}

// ポートフォリオ管理機能のセットアップ
function setupPortfolioManager() {
  const addAssetButton = document.getElementById('add-asset');
  const generatePortfolioButton = document.getElementById('generate-portfolio');
  const portfolioInputs = document.getElementById('portfolio-inputs');
  const portfolioLoading = document.getElementById('portfolio-loading');
  const portfolioResult = document.getElementById('portfolio-result');
  const portfolioSummary = document.querySelector('.portfolio-summary');
  const portfolioReport = document.querySelector('.portfolio-report');
  
  // 入力行の追加
  let rowCount = 4; // デフォルトで4行ある
  
  addAssetButton.addEventListener('click', () => {
    rowCount++;
    
    const newRow = document.createElement('div');
    newRow.className = 'portfolio-input-row';
    newRow.innerHTML = `
      <div class="form-group">
        <label for="asset-name-${rowCount}">銘柄名/投資信託</label>
        <input type="text" id="asset-name-${rowCount}" class="form-control" placeholder="例: 日産自動車 または ｅMAXIS Slim 全世界株式">
      </div>
      <div class="form-group">
        <label for="asset-ratio-${rowCount}">割合 (%)</label>
        <input type="number" id="asset-ratio-${rowCount}" class="form-control" min="1" max="100" value="10">
      </div>
      <button class="btn-remove-row">×</button>
    `;
    
    portfolioInputs.appendChild(newRow);
    
    // 削除ボタンへのイベントリスナー追加
    const removeButton = newRow.querySelector('.btn-remove-row');
    removeButton.addEventListener('click', (e) => {
      e.target.closest('.portfolio-input-row').remove();
    });
  });
  
  // ポートフォリオ分析生成
  generatePortfolioButton.addEventListener('click', () => {
    // 入力値の取得と検証
    const portfolioData = [];
    let totalRatio = 0;
    let hasError = false;
    
    // すべての入力行を取得
    const inputRows = portfolioInputs.querySelectorAll('.portfolio-input-row');
    
    inputRows.forEach((row, index) => {
      const nameInput = row.querySelector(`input[id^="asset-name"]`);
      const ratioInput = row.querySelector(`input[id^="asset-ratio"]`);
      
      if (!nameInput.value.trim()) {
        nameInput.style.borderColor = 'var(--danger-color)';
        hasError = true;
        return;
      }
      
      const ratio = parseInt(ratioInput.value);
      if (isNaN(ratio) || ratio < 1 || ratio > 100) {
        ratioInput.style.borderColor = 'var(--danger-color)';
        hasError = true;
        return;
      }
      
      // エラーがなければスタイルをリセット
      nameInput.style.borderColor = '';
      ratioInput.style.borderColor = '';
      
      portfolioData.push({
        name: nameInput.value.trim(),
        ratio: ratio
      });
      
      totalRatio += ratio;
    });
    
    // 合計が100%になるように調整
    if (totalRatio !== 100 && !hasError) {
      alert('割合の合計が100%になるように調整してください。現在の合計: ' + totalRatio + '%');
      hasError = true;
    }
    
    if (hasError || portfolioData.length === 0) {
      return;
    }
    
    // ローディング表示
    portfolioResult.querySelector('.result-hidden').style.display = 'none';
    portfolioLoading.classList.add('active');
    
    // 分析をシミュレート（実際はAPIリクエスト）
    setTimeout(() => {
      portfolioLoading.classList.remove('active');
      portfolioResult.querySelector('.result-hidden').style.display = 'block';
      
      // チャートの描画
      drawPortfolioChart(portfolioData);
      
      // サマリーの生成
      generatePortfolioSummary(portfolioData, portfolioSummary);
      
      // 詳細レポートの生成
      generatePortfolioReport(portfolioData, portfolioReport);
      
      // アニメーションでスクロール
      setTimeout(() => {
        portfolioResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      
    }, 2000); // 2秒のローディング
  });
}

// ポートフォリオの円グラフ描画
function drawPortfolioChart(portfolioData) {
  const ctx = document.getElementById('portfolio-chart').getContext('2d');
  
  // 既存のチャートがあれば破棄
  if (window.portfolioChart) {
    window.portfolioChart.destroy();
  }
  
  // 色のセットを準備
  const colorSet = [
    { backgroundColor: 'rgba(99, 102, 241, 0.8)', borderColor: 'rgb(99, 102, 241)' },
    { backgroundColor: 'rgba(16, 185, 129, 0.8)', borderColor: 'rgb(16, 185, 129)' },
    { backgroundColor: 'rgba(249, 115, 22, 0.8)', borderColor: 'rgb(249, 115, 22)' },
    { backgroundColor: 'rgba(139, 92, 246, 0.8)', borderColor: 'rgb(139, 92, 246)' },
    { backgroundColor: 'rgba(14, 165, 233, 0.8)', borderColor: 'rgb(14, 165, 233)' },
    { backgroundColor: 'rgba(234, 179, 8, 0.8)', borderColor: 'rgb(234, 179, 8)' },
    { backgroundColor: 'rgba(239, 68, 68, 0.8)', borderColor: 'rgb(239, 68, 68)' },
    { backgroundColor: 'rgba(168, 85, 247, 0.8)', borderColor: 'rgb(168, 85, 247)' },
    { backgroundColor: 'rgba(59, 130, 246, 0.8)', borderColor: 'rgb(59, 130, 246)' },
    { backgroundColor: 'rgba(236, 72, 153, 0.8)', borderColor: 'rgb(236, 72, 153)' }
  ];
  
  // データの準備
  const labels = portfolioData.map(item => item.name);
  const data = portfolioData.map(item => item.ratio);
  
  // 背景色とボーダー色の配列を作成
  const backgroundColors = [];
  const borderColors = [];
  
  portfolioData.forEach((item, index) => {
    const colorIndex = index % colorSet.length;
    backgroundColors.push(colorSet[colorIndex].backgroundColor);
    borderColors.push(colorSet[colorIndex].borderColor);
  });
  
  // グラフの描画
  window.portfolioChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        hoverBorderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#e2e8f0',
            font: {
              family: "'Poppins', 'Noto Sans JP', sans-serif",
              size: 12
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          titleColor: '#10b981',
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(30, 41, 59, 0.5)',
          borderWidth: 1,
          padding: 15,
          cornerRadius: 8,
          titleFont: {
            family: "'Space Grotesk', 'Noto Sans JP', sans-serif",
            weight: 'bold',
            size: 14
          },
          bodyFont: {
            family: "'Inter', 'Noto Sans JP', sans-serif",
            size: 13
          },
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}%`;
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeOutCubic'
      }
    }
  });
}

// ポートフォリオサマリーの生成
function generatePortfolioSummary(portfolioData, container) {
  // 市場環境データ（実際のシステムでは外部データ取得）
  const marketCondition = {
    trend: Math.random() > 0.5 ? '上昇' : '横ばい',
    volatility: ['低', '中程度', '高'][Math.floor(Math.random() * 3)],
    sectors: {
      tech: Math.random() > 0.5 ? '強気' : '弱気',
      finance: Math.random() > 0.5 ? '強気' : '弱気',
      consumer: Math.random() > 0.5 ? '強気' : '弱気',
      healthcare: Math.random() > 0.5 ? '強気' : '弱気',
      energy: Math.random() > 0.5 ? '強気' : '弱気'
    }
  };
  
  // 簡単なポートフォリオ属性を計算
  let largestHolding = { name: '', ratio: 0 };
  const sectorDistribution = {};
  
  portfolioData.forEach(asset => {
    if (asset.ratio > largestHolding.ratio) {
      largestHolding = asset;
    }
    
    // 超簡易的なセクター判定（実際のシステムではもっと精緻に）
    let sector;
    const name = asset.name.toLowerCase();
    
    if (name.includes('テクノロジー') || name.includes('ソフト') || name.includes('半導体') || name.includes('電機')) {
      sector = 'テクノロジー';
    } else if (name.includes('銀行') || name.includes('ファイナンス') || name.includes('保険') || name.includes('証券')) {
      sector = '金融';
    } else if (name.includes('食品') || name.includes('小売') || name.includes('消費')) {
      sector = '一般消費財';
    } else if (name.includes('医薬') || name.includes('ヘルス') || name.includes('医療')) {
      sector = 'ヘルスケア';
    } else if (name.includes('エネルギー') || name.includes('石油') || name.includes('電力')) {
      sector = 'エネルギー';
    } else if (name.includes('全世界') || name.includes('全米') || name.includes('トータル')) {
      sector = '分散投資';
    } else {
      sector = 'その他';
    }
    
    sectorDistribution[sector] = (sectorDistribution[sector] || 0) + asset.ratio;
  });
  
  // 最も集中しているセクター
  let dominantSector = '';
  let maxSectorRatio = 0;
  
  for (const [sector, ratio] of Object.entries(sectorDistribution)) {
    if (ratio > maxSectorRatio) {
      maxSectorRatio = ratio;
      dominantSector = sector;
    }
  }
  
  // 分散度の評価（簡易的）
  let diversificationLevel;
  const assetCount = portfolioData.length;
  
  if (assetCount >= 8) {
    diversificationLevel = '高';
  } else if (assetCount >= 4) {
    diversificationLevel = '中';
  } else {
    diversificationLevel = '低';
  }
  
  // 最大の保有割合で集中度を評価
  let concentrationLevel;
  
  if (largestHolding.ratio > 40) {
    concentrationLevel = '高';
  } else if (largestHolding.ratio > 25) {
    concentrationLevel = '中';
  } else {
    concentrationLevel = '低';
  }
  
  // サマリーの表示
  container.innerHTML = `
    <div class="portfolio-summary-title">
      <h3>ポートフォリオ概要</h3>
    </div>
    
    <div class="portfolio-metrics">
      <div class="metric">
        <div class="metric-label">資産数</div>
        <div class="metric-value">${assetCount}</div>
      </div>
      <div class="metric">
        <div class="metric-label">最大保有</div>
        <div class="metric-value">${largestHolding.name}<span class="metric-subvalue">(${largestHolding.ratio}%)</span></div>
      </div>
      <div class="metric">
        <div class="metric-label">主要セクター</div>
        <div class="metric-value">${dominantSector}<span class="metric-subvalue">(約${Math.round(maxSectorRatio)}%)</span></div>
      </div>
    </div>
    
    <div class="portfolio-evaluation">
      <div class="evaluation-item">
        <div class="evaluation-label">分散度</div>
        <div class="evaluation-gauge">
          <div class="gauge-bar">
            <div class="gauge-fill" style="width: ${diversificationLevel === '高' ? '90%' : diversificationLevel === '中' ? '50%' : '25%'}"></div>
          </div>
          <div class="gauge-value">${diversificationLevel}</div>
        </div>
      </div>
      <div class="evaluation-item">
        <div class="evaluation-label">集中度</div>
        <div class="evaluation-gauge">
          <div class="gauge-bar">
            <div class="gauge-fill" style="width: ${concentrationLevel === '高' ? '90%' : concentrationLevel === '中' ? '50%' : '25%'}; background: ${concentrationLevel === '高' ? 'var(--danger-color)' : concentrationLevel === '中' ? 'var(--warning-color)' : 'var(--success-color)'}"></div>
          </div>
          <div class="gauge-value" style="color: ${concentrationLevel === '高' ? 'var(--danger-color)' : concentrationLevel === '中' ? 'var(--warning-color)' : 'var(--success-color)'}">${concentrationLevel}</div>
        </div>
      </div>
    </div>
    
    <div class="market-conditions">
      <div class="conditions-title">現在の市場環境</div>
      <div class="conditions-grid">
        <div class="condition-item">
          <div class="condition-label">トレンド</div>
          <div class="condition-value ${marketCondition.trend === '上昇' ? 'up' : ''}">${marketCondition.trend}</div>
        </div>
        <div class="condition-item">
          <div class="condition-label">ボラティリティ</div>
          <div class="condition-value">${marketCondition.volatility}</div>
        </div>
        <div class="condition-item">
          <div class="condition-label">テクノロジー</div>
          <div class="condition-value ${marketCondition.sectors.tech === '強気' ? 'up' : 'down'}">${marketCondition.sectors.tech}</div>
        </div>
        <div class="condition-item">
          <div class="condition-label">金融</div>
          <div class="condition-value ${marketCondition.sectors.finance === '強気' ? 'up' : 'down'}">${marketCondition.sectors.finance}</div>
        </div>
      </div>
    </div>
  `;
}

// ポートフォリオ詳細レポート生成
function generatePortfolioReport(portfolioData, container) {
  // 市場環境（実際はAPIから取得）
  const marketConditions = {
    overall: Math.random() > 0.3 ? '好調' : '不安定',
    volatility: Math.random() > 0.5 ? '低' : '高',
    interestRates: Math.random() > 0.6 ? '上昇傾向' : '横ばい',
    economicGrowth: Math.random() > 0.4 ? '拡大' : '減速'
  };
  
  // ポートフォリオの特性に基づいた戦略レコメンド
  const assetCount = portfolioData.length;
  const largestAsset = [...portfolioData].sort((a, b) => b.ratio - a.ratio)[0];
  
  // 過度な集中があるかチェック
  const isHighlyConcentrated = largestAsset.ratio > 40;
  
  // セクター分散のチェック（簡易版）
  const techSector = portfolioData.filter(asset => 
    asset.name.toLowerCase().includes('テクノロジー') || 
    asset.name.toLowerCase().includes('ソフト') ||
    asset.name.toLowerCase().includes('電機')
  ).reduce((total, asset) => total + asset.ratio, 0);
  
  const financeSector = portfolioData.filter(asset => 
    asset.name.toLowerCase().includes('銀行') || 
    asset.name.toLowerCase().includes('金融') ||
    asset.name.toLowerCase().includes('保険')
  ).reduce((total, asset) => total + asset.ratio, 0);
  
  // 投資信託/ETFの比率
  const fundRatio = portfolioData.filter(asset =>
    asset.name.toLowerCase().includes('投資信託') ||
    asset.name.toLowerCase().includes('etf') ||
    asset.name.toLowerCase().includes('インデックス')
  ).reduce((total, asset) => total + asset.ratio, 0);
  
  // 戦略レコメンデーションの生成
  let strategicRecommendations = [];
  
  if (isHighlyConcentrated) {
    strategicRecommendations.push({
      title: '分散投資の検討',
      content: `現在のポートフォリオは${largestAsset.name}に${largestAsset.ratio}%と高い集中度があります。リスク分散のため、複数の資産クラスやセクターに分散することを検討してください。`,
      priority: 'high'
    });
  }
  
  if (techSector > 50) {
    strategicRecommendations.push({
      title: 'テクノロジーセクターの偏重',
      content: 'ポートフォリオがテクノロジーセクターに過度に集中しています。セクター固有のリスクを軽減するため、異なるセクターへの分散を検討してください。',
      priority: 'medium'
    });
  }
  
  if (financeSector > 40) {
    strategicRecommendations.push({
      title: '金融セクターの偏重',
      content: '金融セクターへの配分が高くなっています。金利環境の変化に敏感なセクターであるため、他のセクターへの分散も検討してください。',
      priority: 'medium'
    });
  }
  
  if (fundRatio < 30) {
    strategicRecommendations.push({
      title: 'インデックス投資の増加',
      content: '個別銘柄への投資が大部分を占めています。長期的な安定性を高めるため、低コストのインデックスファンドやETFの割合を増やすことを検討してください。',
      priority: 'low'
    });
  }
  
  if (assetCount < 5) {
    strategicRecommendations.push({
      title: '資産数の増加',
      content: 'ポートフォリオの資産数が少なく、個別銘柄リスクが高まっています。より多くの銘柄や資産クラスを追加することで分散効果を高めることができます。',
      priority: 'medium'
    });
  }
  
  // 市場環境に基づく短期的な戦略
  let shortTermStrategy;
  
  if (marketConditions.overall === '好調' && marketConditions.volatility === '低') {
    shortTermStrategy = {
      title: '成長機会の活用',
      content: '現在の安定した市場環境は、成長株や新興市場への戦略的な投資を検討するのに適しています。ただし、徐々にポジションを構築し、一度に大きなリスクを取らないようにしましょう。'
    };
  } else if (marketConditions.overall === '好調' && marketConditions.volatility === '高') {
    shortTermStrategy = {
      title: '選択的な成長と安定性のバランス',
      content: '市場は全体的に好調ですが、ボラティリティが高い状況です。質の高い成長株と安定的な配当株のバランスを取ることで、上昇相場の機会を活かしつつリスクを管理できます。'
    };
  } else if (marketConditions.overall === '不安定' && marketConditions.volatility === '高') {
    shortTermStrategy = {
      title: '防御的ポジショニング',
      content: '市場の不安定さとボラティリティの高さを考慮すると、防御的なポジショニングが賢明です。質の高い配当株や、景気循環の影響を受けにくいセクターへの配分を増やすことを検討してください。'
    };
  } else {
    shortTermStrategy = {
      title: '徐々に機会を探る',
      content: '市場が不安定でもボラティリティが低い現状では、徐々にポジションを構築しながら、バリュエーションが魅力的な銘柄を探すことが効果的です。定期的な少額投資（ドルコスト平均法）も検討してください。'
    };
  }
  
  // レポート全体をHTMLで生成
  container.innerHTML = `
    <h3>AIが分析した投資戦略</h3>
    
    <div class="report-section">
      <h4>現在の市場環境</h4>
      <div class="market-analysis">
        <div class="market-feature">
          <div class="feature-icon">📈</div>
          <div class="feature-content">
            <div class="feature-title">市場全体の状況</div>
            <div class="feature-desc">${marketConditions.overall}な相場環境が続いています。${marketConditions.overall === '好調' ? '多くのセクターでポジティブなパフォーマンスが見られます。' : '一部のセクターで不安定な値動きが見られています。'}</div>
          </div>
        </div>
        <div class="market-feature">
          <div class="feature-icon">📊</div>
          <div class="feature-content">
            <div class="feature-title">ボラティリティ</div>
            <div class="feature-desc">現在の市場ボラティリティは${marketConditions.volatility}く、${marketConditions.volatility === '低' ? '安定した値動きが続いています。' : '短期的に大きな価格変動がみられます。'}</div>
          </div>
        </div>
        <div class="market-feature">
          <div class="feature-icon">💹</div>
          <div class="feature-content">
            <div class="feature-title">金利環境</div>
            <div class="feature-desc">金利は${marketConditions.interestRates}であり、${marketConditions.interestRates === '上昇傾向' ? '債券価格に下落圧力がかかっています。' : '債券市場は比較的安定しています。'}</div>
          </div>
        </div>
        <div class="market-feature">
          <div class="feature-icon">🏭</div>
          <div class="feature-content">
            <div class="feature-title">経済成長</div>
            <div class="feature-desc">経済は全体として${marketConditions.economicGrowth}の状態にあり、${marketConditions.economicGrowth === '拡大' ? 'コーポレートセクターにプラス要因となっています。' : '企業収益に慎重な見方が必要です。'}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="report-section">
      <h4>戦略的な見解と提案</h4>
      
      <div class="strategy-card">
        <div class="strategy-header">
          <div class="strategy-title">短期的な市場見通しに基づく戦略</div>
          <div class="strategy-badge">向こう3～6ヵ月</div>
        </div>
        <h5>${shortTermStrategy.title}</h5>
        <p>${shortTermStrategy.content}</p>
      </div>
      
      <div class="strategy-recommendations">
        ${strategicRecommendations.map(rec => `
          <div class="recommendation-card priority-${rec.priority}">
            <div class="recommendation-header">
              <div class="recommendation-title">${rec.title}</div>
              <div class="recommendation-priority">優先度: ${rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}</div>
            </div>
            <div class="recommendation-content">${rec.content}</div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="report-section">
      <h4>ポートフォリオのバランス分析</h4>
      
      <p class="balance-analysis">
        現在のポートフォリオは
        ${isHighlyConcentrated ? '<span class="negative-highlight">集中度が高く</span>' : '<span class="positive-highlight">比較的バランスが取れており</span>'}、
        ${assetCount < 5 ? '<span class="negative-highlight">銘柄数が少ない</span>' : '<span class="positive-highlight">適度な銘柄数を持ち</span>'}状態です。
        ${techSector > 50 ? '<span class="negative-highlight">テクノロジーセクターに大きく偏っている</span>' : ''}
        ${financeSector > 40 ? '<span class="negative-highlight">金融セクターへの依存度が高い</span>' : ''}
        
        最適なバランスを目指すためには、
        ${fundRatio < 30 ? 'インデックスファンドなどの分散投資商品の組入れを増やし、' : ''}
        ${isHighlyConcentrated ? '特定銘柄への集中投資を減らし、' : ''}
        ${(techSector > 50 || financeSector > 40) ? '異なるセクターへの分散を図ることが重要です。' : 'この良好なバランスを維持しつつ、市場環境の変化に応じて微調整を行うことをお勧めします。'}
      </p>
      
      <div class="balance-gauge-container">
        <div class="balance-item">
          <div class="balance-title">ポートフォリオの健全度</div>
          <div class="balance-gauge">
            <div class="gauge-track">
              <div class="gauge-fill" style="width: ${(isHighlyConcentrated || assetCount < 5 || techSector > 50 || financeSector > 40) ? '40%' : (fundRatio < 30) ? '65%' : '85%'}"></div>
            </div>
            <div class="gauge-markers">
              <span>改善が必要</span>
              <span>良好</span>
              <span>最適</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="report-section">
      <h4>今後のアクションプラン</h4>
      
      <div class="action-steps">
        <div class="action-step">
          <div class="action-number">1</div>
          <div class="action-content">
            <div class="action-title">${isHighlyConcentrated ? '過度な集中の是正' : 'バランスの維持'}</div>
            <div class="action-desc">${isHighlyConcentrated ? `最も比率の高い${largestAsset.name}の保有比率を段階的に引き下げ、他の資産への分散を図りましょう。` : '現在の良好なバランスを維持しつつ、定期的な見直しを行いましょう。'}</div>
          </div>
        </div>
        
        <div class="action-step">
          <div class="action-number">2</div>
          <div class="action-content">
            <div class="action-title">${(techSector > 50 || financeSector > 40) ? 'セクター分散の改善' : '時間分散の実施'}</div>
            <div class="action-desc">${(techSector > 50 || financeSector > 40) ? '特定セクターへの偏りを是正するため、異なる産業への投資を検討しましょう。' : '定期的な積立投資により、市場の短期的な変動に左右されにくい投資戦略を維持しましょう。'}</div>
          </div>
        </div>
        
        <div class="action-step">
          <div class="action-number">3</div>
          <div class="action-content">
            <div class="action-title">市場環境に応じた調整</div>
            <div class="action-desc">現在の${marketConditions.overall}な相場環境では、${marketConditions.overall === '好調' ? '利益確定の機会を逃さず、急騰銘柄の比率調整を検討しましょう。' : '防御的な資産配分を意識しつつ、割安な優良銘柄への投資機会を探りましょう。'}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="report-disclaimer">
      この分析は現在のポートフォリオ構成と市場環境に基づいています。投資判断の参考情報としてご活用ください。市場環境の変化により、最適な戦略は常に変動することにご留意ください。
    </div>
  `;
}

// 値上がり期待銘柄のフィルター機能を設定
function setupHotStocksFilters() {
  const sectorFilter = document.getElementById('sector-filter');
  const sortFilter = document.getElementById('sort-filter');
  const stockCards = document.querySelectorAll('.hot-stock-card');
  
  // リスク管理テーブルの計算を行う
  calculateRiskManagementValues();
  
  // AI上昇確率を計算・表示する
  calculateAIProbabilities();
  
  // セクターでのフィルタリング
  sectorFilter.addEventListener('change', function() {
    const selectedSector = this.value;
    
    stockCards.forEach(card => {
      if (selectedSector === 'all' || card.getAttribute('data-sector') === selectedSector) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // アニメーション効果のリセットと再適用
    const visibleCards = document.querySelectorAll('.hot-stock-card[style="display: block"]');
    visibleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.transitionDelay = `${index * 0.05}s`;
      }, 50);
    });
  });
  
  // 並び替え
  sortFilter.addEventListener('change', function() {
    const selectedSort = this.value;
    const container = document.querySelector('.hot-stocks-container');
    const cards = Array.from(stockCards);
    
    // 現在表示されているカードのみを対象に
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    
    switch(selectedSort) {
      case 'potential':
        // 期待リターン順にソート
        visibleCards.sort((a, b) => {
          const aReturn = parseFloat(a.querySelector('.potential-value').textContent.replace(/[^0-9.-]/g, ''));
          const bReturn = parseFloat(b.querySelector('.potential-value').textContent.replace(/[^0-9.-]/g, ''));
          return bReturn - aReturn; // 降順
        });
        break;
      
      case 'market-cap':
        // 株価でソート（実際は時価総額だがデモ用に現在株価を使用）
        visibleCards.sort((a, b) => {
          const aPrice = parseInt(a.querySelector('.highlight-value').textContent.replace(/[^0-9]/g, ''));
          const bPrice = parseInt(b.querySelector('.highlight-value').textContent.replace(/[^0-9]/g, ''));
          return bPrice - aPrice; // 降順
        });
        break;
      
      case 'alphabetical':
        // 銘柄名順
        visibleCards.sort((a, b) => {
          const aName = a.querySelector('.stock-name').textContent;
          const bName = b.querySelector('.stock-name').textContent;
          return aName.localeCompare(bName, 'ja');
        });
        break;
    }
    
    // DOMの並び替え
    visibleCards.forEach(card => {
      container.appendChild(card);
    });
    
    // アニメーション
    visibleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.transitionDelay = `${index * 0.05}s`;
      }, 50);
    });
  });
  
  // 初期アニメーション
  stockCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.transitionDelay = `${index * 0.08}s`;
    }, 100);
  });
}

// リスク管理テーブルの値を計算する関数
function calculateRiskManagementValues() {
  // すべての銘柄カードを取得
  const stockCards = document.querySelectorAll('.hot-stock-card');
  
  stockCards.forEach(card => {
    // その銘柄の現在株価を取得
    const priceElement = card.querySelector('.highlight-value');
    if (!priceElement) return;
    
    // 株価を数値に変換（¥や,を除去）
    const priceText = priceElement.textContent;
    const currentPrice = parseInt(priceText.replace(/[^\d]/g, ''));
    
    // リスク管理テーブルの要素がまだない場合は、新規作成
    if (!card.querySelector('.stock-risk-management')) {
      const riskManagementDiv = document.createElement('div');
      riskManagementDiv.className = 'stock-risk-management';
      
      riskManagementDiv.innerHTML = `
        <h4>リスク管理</h4>
        <table class="risk-table">
          <thead>
            <tr>
              <th>リスク</th>
              <th>利益確定</th>
              <th>損切</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="risk-level risk-small">リスク小 (5%)</td>
              <td class="target-price" data-price="${currentPrice}" data-risk="0.05">¥${Math.round(currentPrice * 1.05).toLocaleString()}</td>
              <td class="stop-loss" data-price="${currentPrice}" data-risk="0.05">¥${Math.round(currentPrice * 0.95).toLocaleString()}</td>
            </tr>
            <tr>
              <td class="risk-level risk-medium">リスク中 (10%)</td>
              <td class="target-price" data-price="${currentPrice}" data-risk="0.1">¥${Math.round(currentPrice * 1.1).toLocaleString()}</td>
              <td class="stop-loss" data-price="${currentPrice}" data-risk="0.1">¥${Math.round(currentPrice * 0.9).toLocaleString()}</td>
            </tr>
            <tr>
              <td class="risk-level risk-high">リスク大 (20%)</td>
              <td class="target-price" data-price="${currentPrice}" data-risk="0.2">¥${Math.round(currentPrice * 1.2).toLocaleString()}</td>
              <td class="stop-loss" data-price="${currentPrice}" data-risk="0.2">¥${Math.round(currentPrice * 0.8).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      `;
      
      // 銘柄カードに要素を追加
      const keyPoints = card.querySelector('.stock-key-points');
      if (keyPoints) {
        keyPoints.after(riskManagementDiv);
      } else {
        card.appendChild(riskManagementDiv);
      }
    } else {
      // 既存のリスク管理テーブルを更新
      updateRiskTableValues(card, currentPrice);
    }
  });
}

// リスクテーブルの値を更新する関数
function updateRiskTableValues(card, currentPrice) {
  // 各リスクレベルに対応する利益確定額と損切額を更新
  const targetPriceElements = card.querySelectorAll('.target-price');
  const stopLossElements = card.querySelectorAll('.stop-loss');
  
  targetPriceElements.forEach(element => {
    const riskValue = parseFloat(element.getAttribute('data-risk'));
    element.setAttribute('data-price', currentPrice);
    element.textContent = `¥${Math.round(currentPrice * (1 + riskValue)).toLocaleString()}`;
  });
  
  stopLossElements.forEach(element => {
    const riskValue = parseFloat(element.getAttribute('data-risk'));
    element.setAttribute('data-price', currentPrice);
    element.textContent = `¥${Math.round(currentPrice * (1 - riskValue)).toLocaleString()}`;
  });
}

// AI上昇確率分析を計算・表示する関数
function calculateAIProbabilities() {
  // すべての銘柄カードを取得
  const stockCards = document.querySelectorAll('.hot-stock-card');
  
  stockCards.forEach(card => {
    // この銘柄の現在株価と目標株価を取得
    const currentPriceElement = card.querySelector('.highlight-item:nth-child(1) .highlight-value');
    const targetPriceElement = card.querySelector('.highlight-item:nth-child(2) .highlight-value');
    const expectedReturnElement = card.querySelector('.potential-value');
    
    if (!currentPriceElement || !targetPriceElement || !expectedReturnElement) return;
    
    // 株価情報を数値化
    const currentPrice = parseInt(currentPriceElement.textContent.replace(/[^\d]/g, ''));
    const targetPrice = parseInt(targetPriceElement.textContent.replace(/[^\d]/g, ''));
    const expectedReturn = parseFloat(expectedReturnElement.textContent.replace(/[^0-9.-]/g, ''));
    
    // 各上昇確率を計算（実際は単純な計算ではなく、複雑なモデルが使われる）
    // 期待リターンが高いほど確率も高く、現在株価と目標株価の差が小さいほど達成確率が高い
    const priceRatio = targetPrice / currentPrice;
    
    // 5%上昇確率 (最大95%、最小60%)
    // 期待リターンが高いほど確率も高く、特に5%の上昇は比較的達成しやすいため高確率
    const probability5Percent = Math.min(95, Math.max(60, 75 + (expectedReturn / 2)));
    
    // 10%上昇確率 (最大85%、最小50%)
    // 10%の上昇はやや難しくなるが、期待リターンの高さに応じて確率が上がる
    const probability10Percent = Math.min(85, Math.max(50, 60 + (expectedReturn / 2.5)));
    
    // 20%以上上昇確率 (最大75%、最小35%)
    // 20%以上の上昇はより難しいが、期待リターンが特に高い銘柄は達成確率も高い
    const probability20Percent = Math.min(75, Math.max(35, 30 + expectedReturn / 1.5));
    
    // AI上昇確率セクションを追加
    if (!card.querySelector('.stock-probability-analysis')) {
      const analysisDiv = document.createElement('div');
      analysisDiv.className = 'stock-probability-analysis';
      
      analysisDiv.innerHTML = `
        <h4>AI上昇確率分析<span class="ai-analysis-badge">AI</span></h4>
        <ul class="probability-list">
          <li class="probability-item">
            <div class="probability-label">5%上昇可能性</div>
            <div class="probability-bar-container">
              <div class="probability-bar probability-5-bar" data-value="${Math.round(probability5Percent)}" style="width: ${Math.round(probability5Percent)}%;"></div>
            </div>
            <div class="probability-value probability-5-value">${Math.round(probability5Percent)}%</div>
          </li>
          <li class="probability-item">
            <div class="probability-label">10%上昇可能性</div>
            <div class="probability-bar-container">
              <div class="probability-bar probability-10-bar" data-value="${Math.round(probability10Percent)}" style="width: ${Math.round(probability10Percent)}%;"></div>
            </div>
            <div class="probability-value probability-10-value">${Math.round(probability10Percent)}%</div>
          </li>
          <li class="probability-item">
            <div class="probability-label">20%以上上昇可能性</div>
            <div class="probability-bar-container">
              <div class="probability-bar probability-20-bar" data-value="${Math.round(probability20Percent)}" style="width: ${Math.round(probability20Percent)}%;"></div>
            </div>
            <div class="probability-value probability-20-value">${Math.round(probability20Percent)}%</div>
          </li>
        </ul>
      `;
      
      // 銘柄カードに要素を追加
      const riskManagement = card.querySelector('.stock-risk-management');
      if (riskManagement) {
        riskManagement.after(analysisDiv);
      } else {
        const keyPoints = card.querySelector('.stock-key-points');
        if (keyPoints) {
          keyPoints.after(analysisDiv);
        } else {
          card.appendChild(analysisDiv);
        }
      }
    } else {
      // 既存のAI上昇確率を更新
      updateAIProbabilities(card, probability5Percent, probability10Percent, probability20Percent);
    }
  });
}

// AI上昇確率の値を更新する関数
function updateAIProbabilities(card, probability5Percent, probability10Percent, probability20Percent) {
  const probabilityElement5 = card.querySelector('.probability-5-bar');
  const probabilityElement10 = card.querySelector('.probability-10-bar');
  const probabilityElement20 = card.querySelector('.probability-20-bar');
  
  const valueElement5 = card.querySelector('.probability-5-value');
  const valueElement10 = card.querySelector('.probability-10-value');
  const valueElement20 = card.querySelector('.probability-20-value');
  
  if (probabilityElement5) {
    probabilityElement5.style.width = `${Math.round(probability5Percent)}%`;
    probabilityElement5.setAttribute('data-value', Math.round(probability5Percent));
  }
  
  if (probabilityElement10) {
    probabilityElement10.style.width = `${Math.round(probability10Percent)}%`;
    probabilityElement10.setAttribute('data-value', Math.round(probability10Percent));
  }
  
  if (probabilityElement20) {
    probabilityElement20.style.width = `${Math.round(probability20Percent)}%`;
    probabilityElement20.setAttribute('data-value', Math.round(probability20Percent));
  }
  
  if (valueElement5) {
    valueElement5.textContent = `${Math.round(probability5Percent)}%`;
  }
  
  if (valueElement10) {
    valueElement10.textContent = `${Math.round(probability10Percent)}%`;
  }
  
  if (valueElement20) {
    valueElement20.textContent = `${Math.round(probability20Percent)}%`;
  }
}

// AIレポートの表示
function displayAIReport(stockInfo) {
  const aiReportResult = document.getElementById('ai-report-result');
  const isUp = stockInfo.change >= 0;
  
  const reportCard = document.createElement('div');
  reportCard.className = 'report-card';
  reportCard.style.animationDelay = '0.3s';
  
  const report = stockInfo.report;
  let catalysts = '';
  report.catalysts.forEach(item => {
    catalysts += `<li>${item}</li>`;
  });
  
  let risks = '';
  report.risks.forEach(item => {
    risks += `<li>${item}</li>`;
  });
  
  let recommendationClass = 'neutral';
  if (report.recommendation.rating === '買い' || report.recommendation.rating === '強気買い') {
    recommendationClass = 'up';
  } else if (report.recommendation.rating === '売り') {
    recommendationClass = 'down';
  }
  
  reportCard.innerHTML = `
    <div class="report-header">
      <div class="report-title">
        ${stockInfo.name}（${stockInfo.code}） <span class="ai-badge">AI分析</span>
      </div>
      <div class="report-date">生成日: ${new Date().toLocaleDateString('ja-JP')}</div>
    </div>
    
    <div class="stock-info" style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 1.5rem; gap: 1rem;">
      <div>
        <div class="stock-price">¥${stockInfo.price.toLocaleString()}</div>
        <div class="stock-change ${isUp ? 'up' : 'down'}">
          ${isUp ? '▲' : '▼'} ${Math.abs(stockInfo.change).toLocaleString()} (${Math.abs(stockInfo.changePercent).toFixed(2)}%)
        </div>
      </div>
      <div>
        <div style="text-align: right; color: var(--text-secondary);">業種</div>
        <div style="text-align: right; font-family: 'Poppins', 'Noto Sans JP', sans-serif; font-weight: 500;">${stockInfo.industry}</div>
      </div>
    </div>
    
    <div class="report-content report-generated">
      <p><strong class="highlight" style="font-size: 1.1rem;">概要: </strong>${report.summary}</p>
      
      <h3>${report.financial.title}</h3>
      <p>${report.financial.content}</p>
      
      <h3>${report.technical.title}</h3>
      <p>${report.technical.content}</p>
      
      <h3>${report.outlook.title}</h3>
      <p>${report.outlook.content}</p>
      
      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(16, 185, 129, 0.05)); padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border: 1px solid rgba(99, 102, 241, 0.1);">
        <h3 style="margin-top: 0; color: var(--text-primary);">投資判断</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
          <div>
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">推奨</div>
            <div class="${recommendationClass}" style="font-size: 1.3rem; font-weight: 700; font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;">${report.recommendation.rating}</div>
          </div>
          <div>
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">目標株価</div>
            <div class="highlight" style="font-size: 1.3rem; font-weight: 700; font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;">${report.recommendation.targetPrice}</div>
          </div>
          <div>
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">想定リターン</div>
            <div class="${parseFloat(report.recommendation.potentialReturn) > 0 ? 'up' : 'down'}" style="font-size: 1.3rem; font-weight: 700; font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;">
              ${report.recommendation.potentialReturn}
            </div>
          </div>
          <div>
            <div style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">リスク</div>
            <div style="font-size: 1.3rem; font-weight: 700; font-family: 'Space Grotesk', 'Noto Sans JP', sans-serif;">${report.recommendation.risk}</div>
          </div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 1.5rem;">
        <div>
          <h3>ポジティブ要因</h3>
          <ul style="padding-left: 1.5rem; color: var(--text-secondary);">
            ${catalysts}
          </ul>
        </div>
        <div>
          <h3>リスク要因</h3>
          <ul style="padding-left: 1.5rem; color: var(--text-secondary);">
            ${risks}
          </ul>
        </div>
      </div>
      
      <p style="margin-top: 2.5rem; font-size: 0.9rem; color: var(--text-secondary); border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <strong>免責事項:</strong> このレポートはAIによって生成された分析情報であり、投資判断の参考情報として提供されています。
        実際の投資判断を行う際は、ご自身で追加の調査・分析を行うことをお勧めします。
        市場環境の変化や企業の状況により、分析結果が変動する可能性があります。
      </p>
    </div>
  `;
  
  // アニメーションで表示
  reportCard.style.opacity = '0';
  reportCard.style.transform = 'translateY(20px)';
  
  aiReportResult.appendChild(reportCard);
  
  setTimeout(() => {
    reportCard.style.opacity = '1';
    reportCard.style.transform = 'translateY(0)';
    reportCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }, 100);
}