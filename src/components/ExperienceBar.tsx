export function ExperienceBar(){
  return(
    <header className="experience-bar">
        <span>0 xp</span>
        <div>
          <div style={{ width:'50%' }}/>
          
          <span style={{left: '50%'}} className="current-experience">
            300xp
          </span>
        </div>
        <span>600 xp</span>
    </header>
  )
  
}