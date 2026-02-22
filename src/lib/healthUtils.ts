import type { BabyData } from "@/components/HealthForm";

// WHO approximate reference data (simplified for 1-8 years)
// Format: [age_months, median_male, median_female]
const heightRef: [number, number, number][] = [
  [12, 75.7, 74.0], [18, 82.3, 80.7], [24, 87.8, 86.4],
  [36, 96.1, 95.1], [48, 103.3, 102.7], [60, 110.0, 109.4],
  [72, 116.0, 115.1], [84, 121.7, 120.8], [96, 127.3, 126.6],
];

const weightRef: [number, number, number][] = [
  [12, 9.6, 8.9], [18, 10.9, 10.2], [24, 12.2, 11.5],
  [36, 14.3, 13.9], [48, 16.3, 16.1], [60, 18.3, 18.2],
  [72, 20.5, 20.2], [84, 22.9, 22.4], [96, 25.6, 25.0],
];

function findRef(ageMonths: number, refs: [number, number, number][], gender: "male" | "female") {
  let closest = refs[0];
  let minDiff = Infinity;
  for (const r of refs) {
    const diff = Math.abs(r[0] - ageMonths);
    if (diff < minDiff) { minDiff = diff; closest = r; }
  }
  return gender === "male" ? closest[1] : closest[2];
}

export interface HealthReport {
  bmi: number;
  bmiStatus: string;
  heightStatus: string;
  weightStatus: string;
  overallScore: number;
  overallLabel: string;
  suggestions: string[];
  nutritionTips: string[];
}

export function generateReport(data: BabyData): HealthReport {
  const totalMonths = data.ageYears * 12 + data.ageMonths;
  const heightM = data.height / 100;
  const bmi = data.weight / (heightM * heightM);

  const refH = findRef(totalMonths, heightRef, data.gender);
  const refW = findRef(totalMonths, weightRef, data.gender);

  const hRatio = data.height / refH;
  const wRatio = data.weight / refW;

  const heightStatus = hRatio > 1.05 ? "偏高" : hRatio < 0.95 ? "偏矮" : "正常";
  const weightStatus = wRatio > 1.15 ? "偏重" : wRatio < 0.85 ? "偏轻" : "正常";

  let bmiStatus: string;
  if (bmi < 14) bmiStatus = "偏瘦";
  else if (bmi < 18) bmiStatus = "正常";
  else if (bmi < 20) bmiStatus = "偏胖";
  else bmiStatus = "肥胖";

  const hScore = heightStatus === "正常" ? 30 : 15;
  const wScore = weightStatus === "正常" ? 30 : 15;
  const bScore = bmiStatus === "正常" ? 40 : bmiStatus === "偏瘦" || bmiStatus === "偏胖" ? 25 : 10;
  const overallScore = hScore + wScore + bScore;

  const overallLabel = overallScore >= 85 ? "优秀" : overallScore >= 60 ? "良好" : "需关注";

  const suggestions: string[] = [];
  const nutritionTips: string[] = [];

  if (heightStatus === "偏矮") {
    suggestions.push("建议增加户外活动时间，促进骨骼发育");
    nutritionTips.push("多摄入富含钙质和维生素D的食物，如牛奶、鸡蛋、小鱼干");
  }
  if (weightStatus === "偏轻") {
    suggestions.push("适当增加每日热量摄入，注意均衡饮食");
    nutritionTips.push("增加优质蛋白摄入，如瘦肉、豆制品、奶制品");
  }
  if (weightStatus === "偏重") {
    suggestions.push("控制零食摄入，增加运动量");
    nutritionTips.push("减少高糖高油食物，多吃蔬菜水果和粗粮");
  }
  if (bmiStatus === "正常" && heightStatus === "正常" && weightStatus === "正常") {
    suggestions.push("宝宝发育状况良好，继续保持均衡饮食和适量运动");
    nutritionTips.push("每天保证充足的蔬果、蛋白质和碳水化合物摄入");
  }

  // Age-specific tips
  if (data.ageYears <= 3) {
    nutritionTips.push("1-3岁是大脑发育关键期，适当补充DHA（深海鱼、核桃）");
    nutritionTips.push("每日饮奶量建议 400-600ml");
  } else if (data.ageYears <= 6) {
    nutritionTips.push("4-6岁注意铁的补充，多吃红肉、动物肝脏和菠菜");
    nutritionTips.push("培养规律的三餐两点饮食习惯");
  } else {
    nutritionTips.push("7-8岁学龄期需要充足的能量，早餐尤为重要");
    nutritionTips.push("注意锌的补充，促进生长发育和免疫力");
  }

  return { bmi, bmiStatus, heightStatus, weightStatus, overallScore, overallLabel, suggestions, nutritionTips };
}
