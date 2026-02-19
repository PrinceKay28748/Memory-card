export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-orbit">
        <div className="loading-planet" />
        <div className="loading-moon" />
      </div>
      <p className="loading-text">Pulling images from NASA…</p>
    </div>
  );
}