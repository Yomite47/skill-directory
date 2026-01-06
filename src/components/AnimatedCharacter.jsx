export default function AnimatedCharacter() {
  return (
    <div className="character-container">
      <div className="character academic-char">
        {/* Graduation Cap */}
        <div className="graduation-cap">
          <div className="cap-top"></div>
          <div className="cap-visor"></div>
          <div className="tassel"></div>
        </div>
        
        {/* Head */}
        <div className="character-head academic">
          {/* Glasses */}
          <div className="glasses">
            <div className="glass-left"></div>
            <div className="glass-bridge"></div>
            <div className="glass-right"></div>
          </div>
          {/* Smile */}
          <div className="smile"></div>
        </div>
        
        {/* Body - Academic Robe */}
        <div className="character-body academic-robe"></div>
        
        {/* Book in hand */}
        <div className="book-hand"></div>
        
        {/* Arms */}
        <div className="character-arm arm-left academic"></div>
        <div className="character-arm arm-right academic"></div>
      </div>
      <div className="character-bubble">
        <p>Let's Learn Together! <BookOpen size={16} style={{display:'inline', verticalAlign:'text-bottom'}} /></p>
      </div>
    </div>
  );
}
