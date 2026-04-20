<template>
  <div class="app-shell theme-dark">
    <!-- Telemetry Sidebar -->
    <aside class="sidebar telemetry-panel">
      <div class="brand">
        Nabludatel
        <div class="pulse-indicator" v-if="!dbError && !diskFull"></div>
        <div class="pulse-indicator" style="background: var(--color-warning)" v-else-if="diskFull"></div>
      </div>
      <div class="metrics-grid" v-if="stats">
        <div class="stat-block">
          <div class="metric-label">Sections Queued</div>
          <div class="metric-value mono-text">{{ stats.sections_queued }}</div>
        </div>
        <div class="stat-block">
          <div class="metric-label">Processed</div>
          <div class="metric-value mono-text">{{ stats.processed }}</div>
        </div>
        <div class="stat-block">
          <div class="metric-label">Critical Alerts</div>
          <div class="metric-value mono-text" style="color: var(--color-danger)">{{ stats.critical_alerts }}</div>
        </div>
        <div class="stat-block">
          <div class="metric-label">Disk Space Saved</div>
          <div class="metric-value mono-text">{{ stats.disk_space_saved }}</div>
        </div>
      </div>
    </aside>

    <!-- Main Feed -->
    <main class="fluid-width feed-container">
      <header class="header">
        <h2>Anomaly Feed</h2>
        <div>
          <NuxtLink to="/coverage" class="btn btn-secondary" style="text-decoration: none; padding: 0.5rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--color-border); color: var(--color-text); font-family: var(--font-mono); font-size: 0.875rem;">Coverage Matrix</NuxtLink>
        </div>
      </header>

      <!-- Error States -->
      <div v-if="dbError" class="error-banner">
        DATABASE CONNECTION LOST. Retrying...
      </div>
      <div v-if="diskFull" class="error-banner" style="background: var(--color-warning); color: #000;">
        CRITICAL: Disk space below 5GB. Pipeline halted.
      </div>

      <!-- Empty State -->
      <div v-if="isEmpty" class="empty-state">
        <div>SYSTEM INITIALIZED</div>
        <div style="margin-top: 1rem;">Pipeline active. Waiting for anomalies<span class="blinking-cursor">_</span></div>
      </div>

      <!-- Feed -->
      <div class="feed" v-else>
        <div 
          v-for="a in anomalies" 
          :key="a.id"
          class="anomaly-card" 
          :class="{ 'severity-warning': a.severity === 'warning', 'flash-highlight': a.isNew }"
          @click="openOverlay(a)"
        >
          <div class="alert-header">
            <span class="mono-text">SEC: {{ a.section_id }} ({{ a.settlement }})</span>
            <span class="mono-text">@ {{ a.timestamp }}</span>
          </div>
          <div class="alert-title">{{ a.category }}</div>
          <div class="alert-body">{{ a.ai_reasoning }}</div>
          <div class="transcript-snippet mono-text">
            {{ a.trigger_quote }}
          </div>
        </div>
      </div>
    </main>

    <!-- Section Detail Overlay -->
    <div class="overlay-container" :class="{ 'is-open': selectedAnomaly }">
      <div class="slide-over dossier-panel" v-if="selectedAnomaly">
        <div class="dossier-header">
          <div>
            <div class="mono-heading">SEC: {{ selectedAnomaly.section_id }}</div>
            <div style="color: var(--color-text-muted); font-size: 0.875rem; margin-top: 0.25rem;">
              {{ selectedAnomaly.settlement }}
            </div>
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span class="tag-severity" :class="{ 'warning': selectedAnomaly.severity === 'warning' }">
              {{ selectedAnomaly.severity }}
            </span>
            <button class="close-btn" @click="closeOverlay">&times;</button>
          </div>
        </div>
        
        <div class="reasoning-block text-sans">
          <strong>AI Reasoning:</strong><br>
          {{ selectedAnomaly.ai_reasoning }}
        </div>
        
        <div class="transcript-context mono-block">
          <div v-html="formatTranscript(selectedAnomaly)"></div>
        </div>
        
        <div class="action-bar-sticky">
          <button class="btn btn-primary btn-massive" @click="watchVideo">Watch Video @ {{ selectedAnomaly.timestamp }}</button>
          <button class="btn btn-secondary" @click="markStatus('verified')">Mark Verified</button>
          <button class="btn btn-secondary" @click="markStatus('false_positive')">Mark False Positive</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast" v-if="toastMessage">
      {{ toastMessage }}
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref(null)
const anomalies = ref([])
const transcripts = ref([])

const isEmpty = ref(false)
const dbError = ref(false)
const diskFull = ref(false)

const selectedAnomaly = ref(null)
const toastMessage = ref('')

onMounted(async () => {
  try {
    const [statsRes, anomaliesRes] = await Promise.all([
      fetch('/api/stats').catch(() => null),
      fetch('/api/anomalies').catch(() => null)
    ]);

    if (statsRes && statsRes.ok) {
      const data = await statsRes.json();
      stats.value = data.stats;
    }

    if (anomaliesRes && anomaliesRes.ok) {
      const data = await anomaliesRes.json();
      anomalies.value = data.anomalies;
    }

    if (!stats.value || !anomalies.value.length) {
      // Fallback mock data
      stats.value = {
        sections_queued: 12450,
        processed: 3421,
        critical_alerts: 42,
        disk_space_saved: "1.2 TB"
      }
      anomalies.value = [
        {
          id: "a-001",
          section_id: "152400019",
          settlement: "Gorno Uino",
          severity: "critical",
          category: "Intimidation",
          timestamp: "01:45:22",
          trigger_quote: "Put the phone away or I will break it. Just write 45.",
          ai_reasoning: "Claude detected hostile language and direct threats towards a commission member attempting to log a dispute regarding ballot validity."
        },
        {
          id: "a-002",
          section_id: "030600045",
          settlement: "Varna",
          severity: "warning",
          category: "Unexplained Delay",
          timestamp: "03:12:05",
          trigger_quote: "No, wait. Don't seal them yet. We have to wait for Ivan to call and confirm the numbers match.",
          ai_reasoning: "Transcription indicates a prolonged pause in counting while members wait for a 'phone call from the boss' before sealing the bags."
        }
      ]
    }
  } catch (e) {
    console.error("Failed to load data", e)
  }
})

const openOverlay = async (anomaly) => {
  selectedAnomaly.value = anomaly
  
  // Fetch transcript for this specific anomaly's section
  try {
    const res = await fetch(`/api/sections/${anomaly.section_id}`).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (data.transcript) {
        const existingIndex = transcripts.value.findIndex(t => t.section_id === data.transcript.section_id);
        if (existingIndex >= 0) {
          transcripts.value[existingIndex] = data.transcript;
        } else {
          transcripts.value.push(data.transcript);
        }
      }
    } else {
      // Fallback
      transcripts.value.push({
        section_id: "152400019",
        content_json: "[01:45:10] Speaker A: I need to write this in the protocol, these 5 are invalid.\\n[01:45:18] Speaker B: You are not writing anything. Put the pen down.\\n[01:45:22] Speaker B: Put the phone away or I will break it. Just write 45."
      });
    }
  } catch (e) {
    console.error(e);
  }
}

const closeOverlay = () => {
  selectedAnomaly.value = null
}

const formatTranscript = (anomaly) => {
  const transcript = transcripts.value.find(t => t.section_id === anomaly.section_id)
  if (!transcript) return "Loading transcript..."
  
  let content = transcript.content_json.replace(/\\n/g, '<br><br>')
  content = content.replace(
    anomaly.trigger_quote, 
    `<span class="highlight-trigger">${anomaly.trigger_quote}</span>`
  )
  return content
}

const watchVideo = () => {
  window.open('https://evideo.bg/pe202604/index.html#t=' + selectedAnomaly.value.timestamp.replace(/:/g, ''), '_blank')
}

const showToast = (msg) => {
  toastMessage.value = msg
  setTimeout(() => { toastMessage.value = '' }, 3000)
}

const markStatus = async (status) => {
  if (status === 'verified') {
    showToast('Anomaly verified. Logged for export.')
  } else {
    showToast('Marked as False Positive. Removed from active triage.')
    anomalies.value = anomalies.value.filter(a => a.id !== selectedAnomaly.value.id)
    if (selectedAnomaly.value.severity === 'critical') {
      stats.value.critical_alerts--
    }
  }
  
  // Update in DB
  try {
    await fetch(`/api/anomalies/${selectedAnomaly.value.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    console.error(e);
  }

  closeOverlay()
}
</script>

<style scoped>
.app-shell {
  display: flex;
  width: 100%;
  height: 100vh;
}

.sidebar {
  width: 280px;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-shrink: 0;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pulse-indicator {
  width: 8px;
  height: 8px;
  background-color: var(--color-danger);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 oklch(65% 0.22 25 / 0.7); }
  70% { box-shadow: 0 0 0 6px oklch(65% 0.22 25 / 0); }
  100% { box-shadow: 0 0 0 0 oklch(65% 0.22 25 / 0); }
}

.metrics-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-block {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 1rem;
  border-radius: var(--radius-md);
}

.metric-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 600;
}

.feed-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.anomaly-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-danger);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.anomaly-card:hover {
  background: var(--color-surface-raised);
}

.anomaly-card.severity-warning {
  border-left-color: var(--color-warning);
}

.anomaly-card.flash-highlight {
  animation: flash 1s ease-out;
}

@keyframes flash {
  0% { border-color: var(--color-text); background: var(--color-surface-raised); }
  100% { border-color: var(--color-border); background: var(--color-surface); }
}

.alert-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.alert-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.alert-body {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  color: var(--color-text-muted);
}

.transcript-snippet {
  background: var(--color-bg);
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

/* Overlay */
.overlay-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 600px;
  max-width: 100%;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  transform: translateX(100%);
  transition: transform 150ms linear;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.overlay-container.is-open {
  transform: translateX(0);
}

.dossier-panel {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dossier-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

.mono-heading {
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 700;
}

.tag-severity {
  background: var(--color-danger);
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}
.tag-severity.warning {
  background: var(--color-warning);
  color: #000;
}

.reasoning-block {
  background: var(--color-bg);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  line-height: 1.6;
}

.transcript-context {
  background: var(--color-bg);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

:deep(.highlight-trigger) {
  background: rgba(255, 0, 0, 0.2);
  color: var(--color-text);
  padding: 0.2rem 0;
  border-bottom: 1px solid var(--color-danger);
}

.action-bar-sticky {
  margin-top: auto;
  padding-top: 2rem;
  display: flex;
  gap: 1rem;
  border-top: 1px solid var(--color-border);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}
.blinking-cursor {
  animation: blink 1s step-end infinite;
}
@keyframes blink { 50% { opacity: 0; } }

.error-banner {
  background: var(--color-danger);
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 700;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
}

.toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  padding: 1rem 2rem;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  z-index: 2000;
  box-shadow: var(--shadow-lg);
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
}
</style>
