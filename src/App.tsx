import React, { useState, useEffect, useRef } from 'react';

// Ícones simples
const HeartIcon = () => <span style={{fontSize: '20px'}}>❤️</span>;
const MoonIcon = () => <span style={{fontSize: '20px'}}>🌙</span>;
const SunIcon = () => <span style={{fontSize: '20px'}}>☀️</span>;
const StarsIcon = () => <span style={{fontSize: '20px'}}>✨</span>;
const SparklesIcon = () => <span style={{fontSize: '20px'}}>🌟</span>;
const CameraIcon = () => <span style={{fontSize: '20px'}}>📷</span>;
const GiftIcon = () => <span style={{fontSize: '20px'}}>🎁</span>;
const SmileIcon = () => <span style={{fontSize: '20px'}}>😊</span>;
const BookIcon = () => <span style={{fontSize: '20px'}}>📖</span>;
const CodeIcon = () => <span style={{fontSize: '20px'}}>👨‍💻</span>;
const HeartHandIcon = () => <span style={{fontSize: '20px'}}>💝</span>;

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFinal, setShowFinal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonMessages, setNoButtonMessages] = useState(0);
  const [noButtonText, setNoButtonText] = useState('Não');
  const [hearts, setHearts] = useState([]);
  const [showCredits, setShowCredits] = useState(false);
  const containerRef = useRef(null);

  const questions = [
    {
      id: 1,
      question: "Eu mereço ter laços com você?",
      options: ["Sim, completamente", "Talvez, com o tempo", "Não", "Preciso pensar", "Com certeza!"]
    },
    {
      id: 2,
      question: "O que você sente quando pensa em nós dois?",
      options: ["Alegria", "Paz", "Ansiedade positiva", "Nostalgia", "Todas as opções acima"]
    },
    {
      id: 3,
      question: "Qual seria nosso passeio ideal?",
      options: ["Praia ao pôr do sol", "Cinema com pipoca", "Jantar romântico", "Parque de diversões", "Viagem surpresa"]
    },
    {
      id: 4,
      question: "O que você mais admira em mim?",
      options: ["Senso de humor", "Carinho", "Inteligência", "Atenção", "Tudo em mim 😊"]
    },
    {
      id: 5,
      question: "Acredita em almas gêmeas?",
      options: ["Sim, completamente", "Acredito que construímos", "Talvez", "Não", "Ainda estou descobrindo"]
    },
    {
      id: 6,
      question: "Qual música define a gente?",
      options: ["Romântica", "Animada", "Clássica", "Pop", "Uma que ainda vamos compor juntos"]
    },
    {
      id: 7,
      question: "O que você quer construir comigo?",
      options: ["Amizade", "Amor", "Família", "Aventuras", "Tudo isso e mais um pouco"]
    },
    {
      id: 8,
      question: "Como você se sente agora?",
      options: ["Feliz", "Nervoso(a)", "Ansioso(a)", "Apaixonado(a)", "Todas as emoções juntas"]
    }
  ];

  // Lista de desenvolvedores para créditos
  const developers = [
    { name: "@ImNotPsychotea", role: "Core Developer", icon: "🛠️" },
    { name: "@argp", role: "Security Expert", icon: "🔒" },
    { name: "@aunalil", role: "UI/UX Designer", icon: "🎨" },
    { name: "@MrARM", role: "Mobile Specialist", icon: "📱" },
    { name: "@Siguza", role: "Systems Architect", icon: "🏗️" },
    { name: "@xerub", role: "Backend Engineer", icon: "⚙️" },
    { name: "@pssy", role: "Frontend Developer", icon: "✨" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 100,
          size: Math.random() * 30 + 20,
          speed: Math.random() * 2 + 1
        };
        setHearts(prev => [...prev, newHeart]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateHearts = () => {
      setHearts(prev => 
        prev
          .map(heart => ({
            ...heart,
            y: heart.y - heart.speed
          }))
          .filter(heart => heart.y > -100)
      );
    };

    const interval = setInterval(animateHearts, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowFinal(true);
      }, 500);
    }
  };

  const handleNoButtonHover = () => {
    if (noButtonMessages < 3) {
      const container = containerRef.current;
      if (container) {
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 200;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        setNoButtonPosition({ x: newX, y: newY });
        
        const messages = [
          "Não vai funcionar! 😜",
          "Tenta de novo! 🏃",
          "Quase lá! 🎯",
          "Sou enfeite! 🎀",
          "Não me clique! 🚫"
        ];
        setNoButtonText(messages[Math.floor(Math.random() * messages.length)]);
        setNoButtonMessages(noButtonMessages + 1);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowFinal(false);
    setNoButtonMessages(0);
    setNoButtonText('Não');
    setNoButtonPosition({ x: 0, y: 0 });
  };

  const theme = {
    bg: darkMode ? '#1a1a1a' : 'linear-gradient(135deg, #fff0f5, #ffe4e9, #fff0f5)',
    text: darkMode ? '#ffffff' : '#333333',
    card: darkMode ? '#2d2d2d' : '#ffffff',
    button: 'linear-gradient(135deg, #ff69b4, #ff1493)',
    secondary: 'linear-gradient(135deg, #9370db, #4169e1)',
    border: darkMode ? '#404040' : '#ffb6c1'
  };

  const currentQ = questions[currentQuestion];

  return (
    <div ref={containerRef} style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      transition: 'all 0.5s',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            opacity: 0.5,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          ❤️
        </div>
      ))}

      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '12px',
          borderRadius: '30px',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Botão de Créditos */}
      <button
        onClick={() => setShowCredits(!showCredits)}
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          padding: '12px 20px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        }}
      >
        <CodeIcon /> Créditos
      </button>

      <a
        href="https://instagram.com/vzvellozo"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          padding: '12px 20px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcaf45)',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
          fontWeight: 'bold'
        }}
      >
        <CameraIcon /> @vzvellozo
      </a>

      {/* Modal de Créditos */}
      {showCredits && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            borderRadius: '30px',
            padding: '40px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            border: `2px solid ${theme.border}`
          }}>
            <button
              onClick={() => setShowCredits(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: darkMode ? 'white' : '#333'
              }}
            >
              ✕
            </button>

            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ff69b4, #ff1493, #9370db)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <HeartHandIcon /> Créditos <HeartHandIcon />
            </h2>

            <p style={{
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '16px',
              opacity: 0.8
            }}>
              Este site romântico foi desenvolvido com muito ❤️ por:
            </p>

            <div style={{
              display: 'grid',
              gap: '15px',
              marginBottom: '30px'
            }}>
              {developers.map((dev, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '12px 15px',
                    background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    borderRadius: '15px',
                    transition: 'transform 0.3s',
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s`
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{dev.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '18px',
                      color: 'transparent',
                      background: 'linear-gradient(135deg, #ff69b4, #9370db)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {dev.name}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.7 }}>{dev.role}</div>
                  </div>
                  <HeartIcon />
                </div>
              ))}
            </div>

            <div style={{
              textAlign: 'center',
              padding: '20px',
              background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,105,180,0.1)',
              borderRadius: '20px'
            }}>
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                🙏 Agradecimento especial:
              </p>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>
                A todos que tornaram este momento possível
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '5px', 
                marginTop: '15px',
                fontSize: '20px'
              }}>
                <span>💕</span>
                <span>💖</span>
                <span>💗</span>
                <span>💓</span>
                <span>💘</span>
              </div>
            </div>

            <button
              onClick={() => setShowCredits(false)}
              style={{
                marginTop: '30px',
                padding: '15px 30px',
                width: '100%',
                border: 'none',
                borderRadius: '15px',
                background: theme.button,
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Continuar com amor 💝
            </button>
          </div>
        </div>
      )}

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          width: '100%',
          background: theme.card,
          borderRadius: '30px',
          padding: '30px 20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          border: `2px solid ${theme.border}`,
          backdropFilter: 'blur(10px)'
        }}>
          
          {!showFinal ? (
            <>
              <div style={{ marginBottom: '30px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '14px'
                }}>
                  <span>Questionário Romântico</span>
                  <span>{currentQuestion + 1} de {questions.length}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#ddd',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    background: 'linear-gradient(90deg, #ff69b4, #ff1493)',
                    transition: 'width 0.5s'
                  }} />
                </div>
              </div>

              <div style={{
                animation: 'fadeIn 0.5s',
                marginBottom: '20px'
              }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #ff69b4, #ff1493)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {currentQ.question}
                </h2>
                
                <div style={{
                  display: 'grid',
                  gap: '12px'
                }}>
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(currentQ.id, option)}
                      style={{
                        padding: '15px 20px',
                        border: 'none',
                        borderRadius: '15px',
                        background: theme.button,
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        transform: 'scale(1)',
                        boxShadow: '0 4px 15px rgba(255,105,180,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {index === 0 && <StarsIcon />}
                      {index === 1 && <SparklesIcon />}
                      {index === 2 && <HeartIcon />}
                      {index === 3 && <GiftIcon />}
                      {index === 4 && <SmileIcon />}
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '14px',
                opacity: 0.7,
                marginTop: '20px'
              }}>
                <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <HeartIcon /> Cada resposta nos aproxima mais... <HeartIcon />
                </p>
              </div>
            </>
          ) : (
            <div style={{
              animation: 'bounceIn 0.8s',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '40px',
                background: 'linear-gradient(135deg, #ff69b4, #ff1493, #9370db)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Namora/Fica comigo? 💝
              </h1>

              <div style={{
                position: 'relative',
                minHeight: '200px',
                display: 'flex',
                flexDirection: window.innerWidth < 500 ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <button
                  onClick={() => {
                    alert('🌈🎉💖 EU AMO VOCÊ! 💖🎉🌈\n\nAgora somos oficialmente um casal! 🥰');
                    resetQuiz();
                  }}
                  style={{
                    padding: '20px 40px',
                    fontSize: '24px',
                    border: 'none',
                    borderRadius: '50px',
                    background: theme.button,
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: 'scale(1)',
                    boxShadow: '0 10px 30px rgba(255,105,180,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <HeartIcon /> SIM <HeartIcon />
                </button>

                <button
                  style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    border: 'none',
                    borderRadius: '50px',
                    background: theme.secondary,
                    color: 'white',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    position: noButtonMessages >= 3 ? 'absolute' : 'relative',
                    left: noButtonMessages >= 3 ? noButtonPosition.x : 'auto',
                    top: noButtonMessages >= 3 ? noButtonPosition.y : 'auto'
                  }}
                  onMouseEnter={handleNoButtonHover}
                  onClick={() => {
                    if (noButtonMessages < 3) {
                      handleNoButtonHover();
                    } else {
                      alert('😜 Já que insiste... Mas o SIM está bem ali! 💕');
                    }
                  }}
                >
                  <span style={{ marginRight: '5px' }}>🚫</span>
                  {noButtonText}
                </button>
              </div>

              {Object.keys(answers).length > 0 && (
                <div style={{
                  marginTop: '30px',
                  padding: '20px',
                  borderRadius: '15px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(5px)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <BookIcon /> Nossa História até aqui <BookIcon />
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '10px'
                  }}>
                    {Object.entries(answers).map(([key, value]) => (
                      <div key={key} style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: 'rgba(255,105,180,0.1)',
                        fontSize: '12px'
                      }}>
                        <strong>P{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={resetQuiz}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  background: '#888',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Recomeçar jornada 🔄
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        fontSize: '12px',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        zIndex: 1000
      }}>
        <HeartIcon /> Feito com amor pelos devs <HeartIcon />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        button {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default App;