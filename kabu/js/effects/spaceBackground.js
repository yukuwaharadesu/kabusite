/**
 * モダンでおしゃれな動く背景を作成するスクリプト
 * グラデーションアニメーション、パーティクル、幾何学的形状を組み合わせた最先端デザイン
 */

// 即時実行関数でスコープを分離
(function() {
  class SpaceBackground {
    constructor() {
      console.log("Initializing modern background effect"); // デバッグ用
      
      this.canvas = document.getElementById('space-background');
      if (!this.canvas) {
        console.error("Canvas element 'space-background' not found");
        return;
      }
      
      this.ctx = this.canvas.getContext('2d');
      
      // 各種コレクション
      this.particles = []; // パーティクル
      this.geometricShapes = []; // 幾何学形
      this.flowLines = []; // フローライン
      
      // 設定
      this.lastTime = 0; // 前回のアニメーション時間
      this.particleCount = 250; // パーティクルの数
      this.shapeCount = 12; // 幾何学形の数
      this.flowLineCount = 30; // フローラインの数
      this.gradientHue = 240; // グラデーション色相の初期値
      this.hueSpeed = 0.05; // 色相変化速度
      
      // キャンバスのサイズをウィンドウサイズに合わせる
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
      
      // 初期化
      this.initElements();
      
      // マウス位置の検出（インタラクティブ要素用）
      this.mouseX = 0;
      this.mouseY = 0;
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
      
      // アニメーションをスタート
      console.log("Starting animation");
      this.animate(0);
    }
    
    // キャンバスサイズをウィンドウに合わせる
    resizeCanvas() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      
      console.log(`Canvas resized: ${this.width}x${this.height}`);
      
      // リサイズ時に要素を再生成
      if (this.particles.length > 0) {
        this.initElements();
      }
    }
    
    // すべての要素を初期化
    initElements() {
      this.initParticles();
      this.initGeometricShapes();
      this.initFlowLines();
    }
    
    // パーティクルを初期化
    initParticles() {
      this.particles = [];
      
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 5 + 1, // サイズ: 1〜6px
          speed: Math.random() * 0.8 + 0.3, // 移動速度
          vx: Math.random() * 0.2 - 0.1, // X方向の速度
          vy: Math.random() * 0.2 - 0.1, // Y方向の速度
          opacity: Math.random() * 0.6 + 0.2, // 不透明度: 0.2〜0.8
          hue: Math.random() * 60 + this.gradientHue, // 色相
          pulse: Math.random() * 0.04 + 0.02, // 脈動速度
          pulseDirection: Math.random() > 0.5 ? 1 : -1, // 脈動方向
          glowSize: Math.random() * 15 + 5 // グロー効果のサイズ
        });
      }
      
      console.log(`Created ${this.particles.length} particles`);
    }
    
    // 幾何学形を初期化
    initGeometricShapes() {
      this.geometricShapes = [];
      
      for (let i = 0; i < this.shapeCount; i++) {
        this.geometricShapes.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 100 + 50, // サイズ: 50〜150px
          rotation: Math.random() * Math.PI, // 回転角
          rotationSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1), // 回転速度
          opacity: Math.random() * 0.1 + 0.02, // 不透明度: 0.02〜0.12
          sides: Math.floor(Math.random() * 4) + 3, // 多角形の辺の数: 3〜6
          hue: Math.random() * 60 + this.gradientHue, // 色相
          vx: Math.random() * 0.2 - 0.1, // X方向の速度
          vy: Math.random() * 0.2 - 0.1 // Y方向の速度
        });
      }
      
      console.log(`Created ${this.geometricShapes.length} geometric shapes`);
    }
    
    // フローラインを初期化
    initFlowLines() {
      this.flowLines = [];
      
      for (let i = 0; i < this.flowLineCount; i++) {
        const startX = Math.random() * this.width;
        const startY = Math.random() < 0.5 ? 0 : this.height;
        
        this.flowLines.push({
          points: [{ x: startX, y: startY }],
          maxPoints: Math.floor(Math.random() * 80) + 80, // ライン上の点の最大数: 80〜160
          speed: Math.random() * 3 + 1.5, // 移動速度
          width: Math.random() * 1.5 + 0.5, // ライン幅: 0.5〜2px
          hue: Math.random() * 60 + this.gradientHue, // 色相
          curveFactor: Math.random() * 0.4 + 0.1, // 曲がりの強さ: 0.1〜0.5
          opacity: Math.random() * 0.4 + 0.15, // 不透明度: 0.15〜0.55
          done: false // アニメーション完了フラグ
        });
      }
      
      console.log(`Created ${this.flowLines.length} flow lines`);
    }
    
    // パーティクルの更新
    updateParticles(deltaTime) {
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        // 位置を更新
        p.x += p.vx * p.speed * deltaTime * 30;
        p.y += p.vy * p.speed * deltaTime * 30;
        
        // マウスに引き寄せられる効果（軽微）
        if (this.distanceBetween(p.x, p.y, this.mouseX, this.mouseY) < 200) {
          const angle = Math.atan2(this.mouseY - p.y, this.mouseX - p.x);
          p.vx += Math.cos(angle) * 0.01;
          p.vy += Math.sin(angle) * 0.01;
        }
        
        // 速度を制限
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.5) {
          p.vx = (p.vx / speed) * 0.5;
          p.vy = (p.vy / speed) * 0.5;
        }
        
        // 脈動効果
        p.size += p.pulseDirection * p.pulse * deltaTime * 30;
        if (p.size > 5) {
          p.size = 5;
          p.pulseDirection = -1;
        } else if (p.size < 1) {
          p.size = 1;
          p.pulseDirection = 1;
        }
        
        // 画面外に出たら反対側から再登場
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
      }
    }
    
    // 幾何学形の更新
    updateGeometricShapes(deltaTime) {
      for (let i = 0; i < this.geometricShapes.length; i++) {
        const shape = this.geometricShapes[i];
        
        // 回転を更新
        shape.rotation += shape.rotationSpeed * deltaTime * 30;
        
        // 位置を更新
        shape.x += shape.vx * deltaTime * 30;
        shape.y += shape.vy * deltaTime * 30;
        
        // 画面外に出たら反対側から再登場
        if (shape.x < -shape.size) shape.x = this.width + shape.size;
        if (shape.x > this.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = this.height + shape.size;
        if (shape.y > this.height + shape.size) shape.y = -shape.size;
      }
    }
    
    // フローラインの更新
    updateFlowLines(deltaTime) {
      for (let i = 0; i < this.flowLines.length; i++) {
        const line = this.flowLines[i];
        
        if (line.done) {
          // アニメーション完了したラインを再初期化
          if (Math.random() < 0.01) { // 1%の確率で新ラインを開始
            const startX = Math.random() * this.width;
            const startY = Math.random() < 0.5 ? 0 : this.height;
            line.points = [{ x: startX, y: startY }];
            line.done = false;
          }
          continue;
        }
        
        // 最後のポイントの位置を取得
        const lastPoint = line.points[line.points.length - 1];
        
        // 新しいポイントの方向と距離を計算（流れるような曲線を作る）
        const angle = Math.random() * Math.PI * 2;
        const nextX = lastPoint.x + Math.cos(angle) * line.curveFactor + (Math.random() * 0.6 - 0.3);
        const nextY = lastPoint.y + Math.sin(angle) * line.curveFactor + line.speed * deltaTime * 10;
        
        // 新しいポイントを追加
        line.points.push({ x: nextX, y: nextY });
        
        // 最大ポイント数を超えたらフラグを立てる
        if (line.points.length > line.maxPoints || 
            nextY < 0 || nextY > this.height || 
            nextX < 0 || nextX > this.width) {
          line.done = true;
        }
      }
    }
    
    // グラデーション背景の更新
    updateGradient(deltaTime) {
      // 色相を徐々に変化させる
      this.gradientHue += this.hueSpeed * deltaTime * 30;
      if (this.gradientHue > 360) this.gradientHue = 0;
    }
    
    // 2点間の距離を計算
    distanceBetween(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    // パーティクルの描画
    drawParticle(p) {
      const glow = p.size * 3 + p.glowSize; // グロー効果のサイズ
      
      // グラデーションを設定（グロー効果用）
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
      gradient.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${p.opacity * 1.2})`);
      gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 60%, ${p.opacity * 0.4})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
      
      // グロー効果を描画
      this.ctx.beginPath();
      this.ctx.fillStyle = gradient;
      this.ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
      this.ctx.fill();
      
      // パーティクル本体を描画
      this.ctx.beginPath();
      this.ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.opacity * 2.5})`;
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // 幾何学形の描画
    drawGeometricShape(shape) {
      this.ctx.save();
      this.ctx.translate(shape.x, shape.y);
      this.ctx.rotate(shape.rotation);
      
      // 多角形を描画
      this.ctx.beginPath();
      this.ctx.strokeStyle = `hsla(${shape.hue}, 100%, 70%, ${shape.opacity})`;
      this.ctx.lineWidth = 1;
      
      // 多角形の頂点を計算
      const angle = (Math.PI * 2) / shape.sides;
      for (let i = 0; i < shape.sides; i++) {
        const x = Math.cos(angle * i) * shape.size;
        const y = Math.sin(angle * i) * shape.size;
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.stroke();
      
      this.ctx.restore();
    }
    
    // フローラインの描画
    drawFlowLine(line) {
      if (line.points.length < 2 || line.done) return;
      
      // ラインのパスを作成
      this.ctx.beginPath();
      this.ctx.strokeStyle = `hsla(${line.hue}, 100%, 70%, ${line.opacity})`;
      this.ctx.lineWidth = line.width;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      
      // ポイントを接続
      this.ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        this.ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      
      this.ctx.stroke();
    }
    
    // 波紋効果の描画（マウス位置周辺）
    drawMouseRipple() {
      if (this.mouseX === 0 && this.mouseY === 0) return;
      
      const rippleCount = 3; // 波紋の数
      
      for (let i = 0; i < rippleCount; i++) {
        const time = performance.now() * 0.001;
        const size = (time * 50 + i * 20) % 100; // 波紋サイズ（0〜100のループ）
        
        this.ctx.beginPath();
        this.ctx.strokeStyle = `hsla(${this.gradientHue + 30}, 100%, 70%, ${0.3 - size/100 * 0.3})`;
        this.ctx.lineWidth = 2 - size/100 * 1.5;
        this.ctx.arc(this.mouseX, this.mouseY, size, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }
    
    // 背景全体の描画
    draw() {
      // 背景をクリア
      this.ctx.clearRect(0, 0, this.width, this.height);
      
      try {
        // 深いスペースをイメージした背景
        const bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        bgGradient.addColorStop(0, '#050510');
        bgGradient.addColorStop(0.5, '#0a0a20');
        bgGradient.addColorStop(1, '#050510');
        this.ctx.fillStyle = bgGradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // 幾何学形を描画
        for (const shape of this.geometricShapes) {
          this.drawGeometricShape(shape);
        }
        
        // フローラインを描画
        for (const line of this.flowLines) {
          this.drawFlowLine(line);
        }
        
        // 波紋効果を描画
        this.drawMouseRipple();
        
        // パーティクルを描画
        for (const particle of this.particles) {
          this.drawParticle(particle);
        }
        
        // ビネットエフェクト（周辺を暗くする効果）を描画
        this.drawVignette();
      } catch (e) {
        console.error("Error in draw method:", e);
      }
    }
    
    // ビネットエフェクト
    drawVignette() {
      const gradient = this.ctx.createRadialGradient(
        this.width / 2, this.height / 2, 0,
        this.width / 2, this.height / 2, this.width / 1.2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    // アニメーションループ
    animate(currentTime) {
      try {
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1); // 0.1秒以上の差は制限（タブ切り替え対策）
        this.lastTime = currentTime;
        
        // 各要素を更新
        this.updateParticles(deltaTime);
        this.updateGeometricShapes(deltaTime);
        this.updateFlowLines(deltaTime);
        this.updateGradient(deltaTime);
        this.draw();
        
        // 次のフレームをリクエスト
        requestAnimationFrame((time) => this.animate(time));
      } catch (e) {
        console.error("Error in animation loop:", e);
      }
    }
  }

  // ページの読み込みが完了したらすぐに背景を初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log("DOM ready, initializing background");
    setTimeout(() => {
      try {
        new SpaceBackground();
      } catch (e) {
        console.error("Failed to initialize background:", e);
      }
    }, 100); // 少し遅延させて他のDOMが確実に読み込まれるようにする
  }
})();