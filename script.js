let balance = 1000;
    let currentBet = 10;
    let isSpinning = false;

    function updateBalance(amount) {
      balance += amount;
      document.getElementById('balance').textContent = balance;
      checkGameState();
    }

    function changeBet(amount) {
      if (isSpinning) return;
      
      const newBet = currentBet + amount;
      if (newBet >= 10 && newBet <= balance) {
        currentBet = newBet;
        document.getElementById('currentBet').textContent = currentBet;
      }
    }

    function setMessage(text, isWin = false) {
      const messageEl = document.getElementById('message');
      messageEl.textContent = text;
      messageEl.className = 'message' + (isWin ? ' win-animation' : '');
    }

    function checkGameState() {
      const spinButton = document.getElementById('spinButton');
      spinButton.disabled = balance < currentBet;
      
      if (balance <= 0) {
        setMessage('😢 لقد خسرت كل رصيدك! قم بتحديث الصفحة للعب مجدداً');
      }
    }

    function spin() {
      if (isSpinning || balance < currentBet) return;
      
      isSpinning = true;
      updateBalance(-currentBet);
      
      const numbersDisplay = document.getElementById('numbersDisplay');
      numbersDisplay.classList.add('spinning');
      
      setMessage('🎲 جاري السحب...');
      
      setTimeout(() => {
        numbersDisplay.classList.remove('spinning');
        
        const numbers = Array.from({length: 3}, () => Math.floor(Math.random() * 7));
        const numberElements = document.querySelectorAll('.number');
        
        numbers.forEach((num, index) => {
          numberElements[index].textContent = num;
        });
        
        // التحقق من الفوز
        if (numbers[0] === numbers[1] && numbers[1] === numbers[2]) {
          // ثلاثة أرقام متطابقة
          const prize = currentBet * 50;
          updateBalance(prize);
          setMessage(`🎉 مبروك! فزت بـ ${prize} 💰`, true);
        } else if (numbers[0] === numbers[1] || numbers[1] === numbers[2] || numbers[0] === numbers[2]) {
          // رقمين متطابقين
          const prize = currentBet * 5;
          updateBalance(prize);
          setMessage(`🎈 جيد! فزت بـ ${prize} 💰`, true);
        } else {
          setMessage('😢 حظ أوفر في المرة القادمة');
        }
        
        isSpinning = false;
        checkGameState();
      }, 1500);
    }

    // تهيئة اللعبة
    checkGameState();
