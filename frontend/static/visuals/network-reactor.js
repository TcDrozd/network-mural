// network-reactor.js
// Applies network data to influence animation parameters

export function applyNetworkData(points, networkStats, options = {}) {
  const positions = points.geometry.attributes.position.array;
  const time = Date.now() * 0.001;

  const { speedScale = 0.001, burstThreshold = 1e9 } = options;
  const sendRate = networkStats.bytes_sent || 0;
  const recvRate = networkStats.bytes_recv || 0;

  const magnitude = (sendRate + recvRate) * speedScale;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += Math.sin(time + i) * magnitude;
    positions[i + 1] += Math.cos(time + i) * magnitude;

    if (sendRate > burstThreshold) {
      positions[i + 2] += Math.sin(time * 2 + i) * magnitude * 2;
    }
  }

  points.geometry.attributes.position.needsUpdate = true;
}