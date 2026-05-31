import { motion } from 'framer-motion'

export default function StatCard({ label, value, icon: Icon, sublabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl p-5 neon-border relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
        style={{
          background: 'radial-gradient(circle at 0% 0%, rgba(195,255,51,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-text-muted text-xs font-mono tracking-widest uppercase">{label}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-accent" />
            </div>
          )}
        </div>
        <div className="font-display text-4xl text-white">{value}</div>
        {sublabel && <p className="text-text-muted text-xs mt-1">{sublabel}</p>}
      </div>
    </motion.div>
  )
}
