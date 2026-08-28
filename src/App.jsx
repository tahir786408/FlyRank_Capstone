import SettingsForm from './components/SettingsForm.jsx'
import './App.css'

function App() {
  return (
    <main className="settings-page">
      <header className="settings-header">
        <p className="eyebrow">FlyRank</p>
        <h1>Settings</h1>
        <p>Update your profile, ranking preferences, and notification choices.</p>
      </header>
      <SettingsForm />
    </main>
  )
}

export default App
