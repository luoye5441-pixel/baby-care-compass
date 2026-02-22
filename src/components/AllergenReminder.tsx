import { useState } from "react";
import { motion } from "framer-motion";

const COMMON_ALLERGENS = [
  { id: "milk", label: "牛奶", icon: "🥛" },
  { id: "egg", label: "鸡蛋", icon: "🥚" },
  { id: "peanut", label: "花生", icon: "🥜" },
  { id: "treenut", label: "坚果", icon: "🌰" },
  { id: "wheat", label: "小麦", icon: "🌾" },
  { id: "soy", label: "大豆", icon: "🫘" },
  { id: "fish", label: "鱼类", icon: "🐟" },
  { id: "shrimp", label: "虾蟹", icon: "🦐" },
  { id: "mango", label: "芒果", icon: "🥭" },
  { id: "peach", label: "桃子", icon: "🍑" },
  { id: "kiwi", label: "猕猴桃", icon: "🥝" },
  { id: "sesame", label: "芝麻", icon: "🫘" },
];

const AllergenReminder = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="section-padding"
    >
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">⚠️ 过敏源管理</h2>
          <p className="text-muted-foreground">标记宝宝的已知过敏源，获取饮食安全提醒</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
            {COMMON_ALLERGENS.map((a) => {
              const active = selected.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all text-sm ${
                    active
                      ? "bg-destructive/10 border-destructive/40 text-destructive"
                      : "bg-background border-input hover:border-primary/40"
                  }`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="font-medium">{a.label}</span>
                </button>
              );
            })}
          </div>

          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="rounded-2xl bg-destructive/5 border border-destructive/20 p-5"
            >
              <p className="font-medium text-destructive mb-2">
                ⚠️ 已标记 {selected.length} 种过敏源
              </p>
              <p className="text-sm text-muted-foreground">
                请在给宝宝添加新食物时注意避免以上过敏源。建议首次添加新食物时少量尝试，观察48小时无异常后再增加用量。如有严重过敏史，请随身携带抗过敏药物并及时就医。
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default AllergenReminder;
