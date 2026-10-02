/* ============================================================
   Padosi Pro — Load Test (1000-user safety check)
   Sirf Node.js built-ins use karta hai, koi extra install nahi chahiye.

   Usage:
     node loadtest.js <base-url> <concurrent-users> <requests-per-user>
   Example (local):
     node loadtest.js http://localhost:3001 1000 3
   Example (deployed):
     node loadtest.js https://padosi-pro-api.onrender.com 1000 3
   ============================================================ */
const BASE = process.argv[2] || 'http://localhost:3001';
const CONCURRENCY = parseInt(process.argv[3] || '1000', 10);
const PER_USER = parseInt(process.argv[4] || '3', 10);

async function hit(path) {
  const start = Date.now();
  try {
    const res = await fetch(BASE + path);
    await res.text();
    return { ok: res.ok, status: res.status, ms: Date.now() - start };
  } catch (e) {
    return { ok: false, status: 0, ms: Date.now() - start, error: e.message };
  }
}

async function simulateUser() {
  const results = [];
  for (let i = 0; i < PER_USER; i++) {
    results.push(await hit('/api/health'));
    results.push(await hit('/api/tasks'));
  }
  return results;
}

(async () => {
  console.log(`\n🔥 Padosi Pro Load Test — ${CONCURRENCY} concurrent users x ${PER_USER} requests each, target: ${BASE}\n`);
  const startedAt = Date.now();
  const users = Array.from({ length: CONCURRENCY }, () => simulateUser());
  const settled = await Promise.all(users);
  const flat = settled.flat();
  const totalMs = Date.now() - startedAt;

  const ok = flat.filter(r => r.ok).length;
  const failed = flat.length - ok;
  const latencies = flat.map(r => r.ms).sort((a, b) => a - b);
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const errorSample = flat.find(r => !r.ok);

  console.log(`Total requests:   ${flat.length}`);
  console.log(`Succeeded:        ${ok} (${((ok / flat.length) * 100).toFixed(1)}%)`);
  console.log(`Failed:           ${failed} (${((failed / flat.length) * 100).toFixed(1)}%)`);
  console.log(`Wall clock time:  ${(totalMs / 1000).toFixed(1)}s`);
  console.log(`Latency p50/p95/p99: ${p50}ms / ${p95}ms / ${p99}ms`);
  if (errorSample) console.log(`Sample error:     status=${errorSample.status} ${errorSample.error || ''}`);
  if (failed / flat.length > 0.05) {
    console.log('\n⚠️  5% se zyada requests fail hui — free-tier hosting (Render free / Supabase free pool) is scale pe struggle kar sakta hai. Paid tier consider karo.');
  } else {
    console.log('\n✅ Failure rate 5% se kam hai — is load ke liye backend theek handle kar raha hai.');
  }
})();
