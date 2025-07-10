window.onload = function () {
    const votesContainer = document.getElementById('votesContainer');
    const pollOptions = JSON.parse(votesContainer.dataset.options);
  
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
  
    const colors = ['#FF6384', '#FFCE56', '#36A2EB', '#4BC0C0'];
  
    
    function drawPieChart(ctx, options, colors) {
      const filteredOptions = options.filter(option => option.no_votes > 0);
  
      if (filteredOptions.length === 0) {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        ctx.fillStyle = '#000';
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('No votes available', canvas.width / 2, canvas.height / 2);
      } else {
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        let totalVotes = filteredOptions.reduce((sum, option) => sum + option.no_votes, 0);
        let startAngle = 0;
  
        filteredOptions.forEach((option, index) => {
          let sliceAngle = (option.no_votes / totalVotes) * 2 * Math.PI;
  
          
          ctx.beginPath();
          ctx.moveTo(200, 200);
          ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
          ctx.fillStyle = colors[index % colors.length];
          ctx.fill();
  
          
          let labelAngle = startAngle + sliceAngle / 2;
          let labelX = 200 + Math.cos(labelAngle) * 100;
          let labelY = 200 + Math.sin(labelAngle) * 100;
  
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
  
          ctx.fillStyle = '#fff';
          ctx.font = '18px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(option.text, labelX, labelY);
  
          ctx.shadowColor = 'transparent';
  
          startAngle += sliceAngle;
        });
      }
    }
  
    drawPieChart(ctx, pollOptions, colors);
  
    const socket = io();
  
    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });
  
    socket.on("voteUpdate", (updatedOption) => {  
      const index = pollOptions.findIndex(option => option.id === updatedOption.id);
      if (index !== -1) {
        pollOptions[index].no_votes = updatedOption.no_votes;
  
        drawPieChart(ctx, pollOptions, colors);
      }
    });
  };
  