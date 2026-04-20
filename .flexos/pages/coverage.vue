<template>
  <div class="app-shell theme-dark">
    <aside class="sidebar telemetry-panel">
      <div class="brand">
        Nabludatel
      </div>
      <nav style="display: flex; flex-direction: column; gap: 1rem; margin-top: 2rem;">
        <NuxtLink to="/" class="btn btn-secondary" style="text-decoration: none; text-align: center;">Dashboard</NuxtLink>
        <NuxtLink to="/coverage" class="btn btn-primary" style="text-decoration: none; text-align: center;">Coverage</NuxtLink>
      </nav>
    </aside>
    <main class="fluid-width feed-container">
      <header class="header" style="margin-bottom: 2rem; padding: 2rem 2rem 0 2rem;">
        <h2>Coverage Matrix</h2>
      </header>
      <div class="matrix-container" style="padding: 0 2rem 2rem 2rem;">
        <table class="table-dense mono-text">
          <thead>
            <tr>
              <th>ID</th>
              <th>Location</th>
              <th>Type</th>
              <th>Status</th>
              <th>Alerts</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in sections" :key="s.section_id" style="cursor: pointer;" @click="openSection(s.section_id)">
              <td>{{ s.section_id }}</td>
              <td>{{ s.region }}, {{ s.municipality }}, {{ s.settlement }}</td>
              <td>{{ s.is_rural ? 'Rural' : 'Urban' }}</td>
              <td>
                <span v-if="s.status === 'complete'" class="status-shape-square"></span>
                <span v-else-if="s.status === 'flagged'" class="status-shape-triangle"></span>
                <span v-else class="status-shape-circle"></span>
                {{ s.status }}
              </td>
              <td>{{ s.alert_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sections = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/api/stats').catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      sections.value = data.sections || [];
    } else {
      // Fallback mock data
      sections.value = [
        {
          section_id: "152400019",
          region: "Pleven",
          municipality: "Pleven",
          settlement: "Gorno Uino",
          is_rural: true,
          status: "flagged",
          alert_count: 1
        },
        {
          section_id: "030600045",
          region: "Varna",
          municipality: "Varna",
          settlement: "Varna",
          is_rural: false,
          status: "flagged",
          alert_count: 1
        },
        {
          section_id: "224600012",
          region: "Sofia",
          municipality: "Sofia",
          settlement: "Sofia",
          is_rural: false,
          status: "complete",
          alert_count: 0
        }
      ]
    }
  } catch (e) {
    console.error("Failed to load data", e)
  }
})

const openSection = (id) => {
  // In a real app, this might open the overlay or navigate
  router.push(`/?section=${id}`)
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

.feed-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.table-dense { 
  width: 100%; 
  border-collapse: collapse; 
  font-family: var(--font-mono);
  font-size: 0.875rem;
}
.table-dense th, .table-dense td { 
  padding: var(--space-2); 
  border-bottom: 1px solid var(--color-border); 
  text-align: left; 
}
.table-dense tr:hover {
  background-color: var(--color-surface-raised);
}
.status-shape-square { 
  display: inline-block; 
  width: 10px; 
  height: 10px; 
  background: var(--color-success); 
  margin-right: 0.5rem;
}
.status-shape-triangle { 
  display: inline-block; 
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent; 
  border-right: 5px solid transparent; 
  border-bottom: 10px solid var(--color-danger); 
  margin-right: 0.5rem;
}
.status-shape-circle { 
  display: inline-block; 
  width: 10px; 
  height: 10px; 
  background: var(--color-warning); 
  border-radius: 50%; 
  margin-right: 0.5rem;
}
</style>
