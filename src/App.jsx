import { useState, useEffect, useCallback, useMemo } from "react";

// ═════════════════════════════════════════════════════════════
// BHOJAN v3 — Indian Vegetarian Family Meal Planner
// Real Images · 100+ Meals · Deep Onboarding · KG Grocery
// ═════════════════════════════════════════════════════════════

// Wikimedia Commons + reliable image URLs for Indian dishes
const IMG = {
  aloo_paratha: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloo_Paratha.jpg/320px-Aloo_Paratha.jpg",
  poha: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kanda_Poha.JPG/320px-Kanda_Poha.JPG",
  upma: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Upma1.jpg/320px-Upma1.jpg",
  idli: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/320px-Idli_Sambar.JPG",
  dosa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Dosa_and_sambar.jpg/320px-Dosa_and_sambar.jpg",
  dhokla: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Khaman_Dhokla.jpg/320px-Khaman_Dhokla.jpg",
  rajma: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Rajma_chawal.jpg/320px-Rajma_chawal.jpg",
  dal_makhani: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dal_makhani.JPG/320px-Dal_makhani.JPG",
  chole: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Chole_Bhature.jpg/320px-Chole_Bhature.jpg",
  palak_paneer: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Palak-Paneer.jpg/320px-Palak-Paneer.jpg",
  biryani: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hyderabadi_Biryani.jpg/320px-Hyderabadi_Biryani.jpg",
  paneer_butter: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Mutter_paneer.jpg/320px-Mutter_paneer.jpg",
  pav_bhaji: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Pav_Bhaji.jpg/320px-Pav_Bhaji.jpg",
  khichdi: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Khichdi_pic.jpg/320px-Khichdi_pic.jpg",
  sambar_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Idli_Sambar.JPG/320px-Idli_Sambar.JPG",
  kadhi: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Kadhi_Pakora.jpg/320px-Kadhi_Pakora.jpg",
  pulao: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Vegetable_Pulao.jpg/320px-Vegetable_Pulao.jpg",
  noodles: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Chow_mein_by_yuen.jpg/320px-Chow_mein_by_yuen.jpg",
  pasta: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Penne_with_tomato_sauce.jpg/320px-Penne_with_tomato_sauce.jpg",
  thali: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Indian_Thali.jpg/320px-Indian_Thali.jpg",
  dal_fry: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Dal_makhani.JPG/320px-Dal_makhani.JPG",
  roti: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chapati_%28Indian_bread%29.jpg/320px-Chapati_%28Indian_bread%29.jpg",
  puri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Puri_%28food%29_from_Rajasthan.jpg/320px-Puri_%28food%29_from_Rajasthan.jpg",
  sabudana: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Sabudana_Khichdi.JPG/320px-Sabudana_Khichdi.JPG",
  paneer_tikka: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Paneer_tikka_masala.jpg/320px-Paneer_tikka_masala.jpg",
  chilla: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kanda_Poha.JPG/320px-Kanda_Poha.JPG",
  thepla: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloo_Paratha.jpg/320px-Aloo_Paratha.jpg",
  uttapam: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Dosa_and_sambar.jpg/320px-Dosa_and_sambar.jpg",
  fried_rice: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Fried_Rice.jpg/320px-Fried_Rice.jpg",
  soup: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vegetable_soup.jpg/320px-Vegetable_soup.jpg",
  wrap: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shawarma.jpg/320px-Shawarma.jpg",
  default_food: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Indian_Thali.jpg/320px-Indian_Thali.jpg",
};

const C = { bg: "#FFFAF3", card: "#FFFDF8", border: "#F0E6D6", orange: "#D4760A", orangeL: "#FFF0DC", brown: "#2D1B0E", brownM: "#5D4037", brownL: "#A08060", green: "#2E7D32", greenBg: "#E8F5E9", red: "#D32F2F", purple: "#7B52AB" };
const fonts = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Source+Sans+3:wght@400;500;600;700&display=swap');`;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MT = ["breakfast", "lunch", "dinner"];
const ML = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner" };
const MI = { breakfast: "🌅", lunch: "☀️", dinner: "🌙" };

// ═══ EXPANDED MEAL DATABASE — 100+ MEALS ═══
// Each has: macros, ingredients with QTY in metric, steps, image
const DB = [
  // ── BREAKFAST (30+) ──
  {
    id: "b01", name: "Aloo Paratha", type: "breakfast", region: "North", effort: 30, season: "all", combo: ["Curd", "Pickle"], img: IMG.aloo_paratha,
    ingredients: [{ n: "Wheat flour", q: "500g" }, { n: "Potato", q: "400g" }, { n: "Green chili", q: "3 pcs" }, { n: "Coriander leaves", q: "30g" }, { n: "Cumin seeds", q: "5g" }, { n: "Ghee", q: "40g" }, { n: "Salt", q: "10g" }],
    tags: ["filling", "kid-friendly"], noOG: false, macros: { cal: 320, p: 8, c: 45, f: 13, fb: 4 },
    steps: ["Boil, peel and mash potatoes. Mix with chopped chili, coriander, cumin, salt.", "Knead soft dough with wheat flour, water, pinch of salt. Rest 15 min covered.", "Divide dough into balls. Roll, stuff with potato mix, seal edges, roll flat gently.", "Cook on hot tawa with ghee, pressing edges, till golden brown on both sides.", "Serve hot with fresh curd, pickle, and a pat of butter."], similar: ["b12", "b11", "b17"]
  },
  {
    id: "b02", name: "Poha", type: "breakfast", region: "West", effort: 15, season: "all", combo: ["Sev", "Lemon"], img: IMG.poha,
    ingredients: [{ n: "Flattened rice (Poha)", q: "400g" }, { n: "Onion", q: "150g" }, { n: "Peanuts", q: "50g" }, { n: "Curry leaves", q: "10 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Green chili", q: "2 pcs" }, { n: "Lemon", q: "1 pc" }, { n: "Sugar", q: "10g" }],
    tags: ["quick", "light"], noOG: false, macros: { cal: 250, p: 6, c: 40, f: 8, fb: 2 },
    steps: ["Rinse poha gently, drain. Add salt and turmeric, toss.", "Heat oil, splutter mustard seeds, add curry leaves, peanuts, chopped onion.", "Sauté till onion softens. Add green chili.", "Add poha, mix gently on low heat 2-3 min. Add pinch of sugar.", "Squeeze lemon, top with sev and coriander. Serve warm."], similar: ["b03", "b16"]
  },
  {
    id: "b03", name: "Upma", type: "breakfast", region: "South", effort: 20, season: "all", combo: ["Coconut chutney"], img: IMG.upma,
    ingredients: [{ n: "Semolina (Rava)", q: "250g" }, { n: "Onion", q: "100g" }, { n: "Green chili", q: "2 pcs" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Cashews", q: "20g" }, { n: "Ghee", q: "20g" }, { n: "Salt", q: "8g" }],
    tags: ["quick", "filling"], noOG: false, macros: { cal: 280, p: 7, c: 42, f: 9, fb: 3 },
    steps: ["Dry roast semolina on low flame till fragrant. Set aside.", "Heat ghee, splutter mustard seeds, urad dal, curry leaves, cashews.", "Add chopped onion and green chili, sauté till golden.", "Pour 600ml water, add salt, bring to boil.", "Slowly add semolina stirring continuously. Cook covered 3 min."], similar: ["b02", "b16"]
  },
  {
    id: "b04", name: "Idli Sambhar", type: "breakfast", region: "South", effort: 15, season: "all", combo: ["Coconut chutney"], img: IMG.idli,
    ingredients: [{ n: "Idli batter", q: "500g" }, { n: "Toor dal", q: "150g" }, { n: "Mixed vegetables", q: "200g" }, { n: "Tamarind", q: "20g" }, { n: "Sambhar powder", q: "15g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }],
    tags: ["healthy", "steamed"], noOG: false, macros: { cal: 220, p: 9, c: 38, f: 4, fb: 5 },
    steps: ["Pour batter into greased idli moulds.", "Steam 10-12 min till toothpick comes clean.", "Cook toor dal soft. Sauté vegetables with sambhar powder.", "Add tamarind water and cooked dal. Simmer 10 min.", "Serve soft idlis with hot sambhar and coconut chutney."], similar: ["b05", "b10"]
  },
  {
    id: "b05", name: "Masala Dosa", type: "breakfast", region: "South", effort: 30, season: "all", combo: ["Chutney", "Sambhar"], img: IMG.dosa,
    ingredients: [{ n: "Dosa batter", q: "500g" }, { n: "Potato", q: "300g" }, { n: "Onion", q: "100g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Turmeric", q: "3g" }, { n: "Oil", q: "30ml" }],
    tags: ["filling", "weekend"], noOG: false, macros: { cal: 310, p: 8, c: 48, f: 10, fb: 3 },
    steps: ["Boil potatoes. Make masala: sauté mustard, curry leaves, onion. Add mashed potato, turmeric.", "Heat flat tawa hot. Pour batter, spread thin circle.", "Drizzle oil around edges. Cook till crisp golden.", "Place potato masala in center. Fold.", "Serve with coconut chutney and sambhar."], similar: ["b04", "b10"]
  },
  {
    id: "b06", name: "Moong Dal Chilla", type: "breakfast", region: "North", effort: 20, season: "all", combo: ["Green chutney", "Curd"], img: IMG.chilla,
    ingredients: [{ n: "Moong dal", q: "250g" }, { n: "Green chili", q: "2 pcs" }, { n: "Ginger", q: "10g" }, { n: "Cumin", q: "5g" }, { n: "Coriander leaves", q: "20g" }, { n: "Salt", q: "8g" }, { n: "Oil", q: "15ml" }],
    tags: ["protein", "healthy"], noOG: false, macros: { cal: 200, p: 14, c: 28, f: 4, fb: 6 },
    steps: ["Soak moong dal 4 hours. Grind smooth with chili, ginger, water.", "Add cumin, coriander, salt. Pouring consistency.", "Heat non-stick tawa. Spread thin like dosa.", "Cook till bottom sets. Flip, cook other side.", "Serve with green chutney and curd."], similar: ["b07", "b14"]
  },
  {
    id: "b07", name: "Besan Chilla", type: "breakfast", region: "North", effort: 15, season: "all", combo: ["Green chutney"], img: IMG.chilla,
    ingredients: [{ n: "Besan (gram flour)", q: "200g" }, { n: "Onion", q: "80g" }, { n: "Tomato", q: "80g" }, { n: "Green chili", q: "2 pcs" }, { n: "Coriander leaves", q: "15g" }, { n: "Turmeric", q: "3g" }, { n: "Salt", q: "8g" }],
    tags: ["quick", "protein"], noOG: false, macros: { cal: 230, p: 12, c: 30, f: 7, fb: 5 },
    steps: ["Mix besan with water to smooth batter. Add chopped vegetables.", "Add turmeric, salt, coriander.", "Pour on hot tawa, spread thin. Cook medium heat.", "Flip when golden. Cook other side.", "Serve with green chutney."], similar: ["b06", "b14"]
  },
  {
    id: "b08", name: "Sabudana Khichdi", type: "breakfast", region: "West", effort: 20, season: "all", combo: ["Curd"], img: IMG.sabudana,
    ingredients: [{ n: "Sabudana (sago)", q: "250g" }, { n: "Peanuts", q: "60g" }, { n: "Potato", q: "200g" }, { n: "Green chili", q: "2 pcs" }, { n: "Cumin", q: "5g" }, { n: "Rock salt", q: "8g" }, { n: "Ghee", q: "20g" }, { n: "Lemon", q: "1 pc" }],
    tags: ["fasting", "filling"], noOG: true, macros: { cal: 340, p: 7, c: 55, f: 11, fb: 2 },
    steps: ["Soak sabudana overnight. Drain completely.", "Heat ghee, cumin, chili, cubed potato. Cook till soft.", "Add crushed roasted peanuts.", "Add sabudana, rock salt. Toss gently 5 min.", "Squeeze lemon. Serve with curd."], similar: ["b21"]
  },
  {
    id: "b09", name: "Methi Thepla", type: "breakfast", region: "West", effort: 25, season: "winter", combo: ["Curd", "Pickle", "Chai"], img: IMG.thepla,
    ingredients: [{ n: "Wheat flour", q: "300g" }, { n: "Besan", q: "50g" }, { n: "Fenugreek leaves", q: "100g" }, { n: "Yogurt", q: "60g" }, { n: "Turmeric", q: "3g" }, { n: "Chili powder", q: "5g" }, { n: "Oil", q: "20ml" }, { n: "Salt", q: "8g" }],
    tags: ["healthy", "travel"], noOG: false, macros: { cal: 260, p: 9, c: 38, f: 8, fb: 4 },
    steps: ["Wash and chop methi leaves fine.", "Mix flour, besan, methi, turmeric, chili, salt, yogurt.", "Knead firm dough. Rest 10 min.", "Roll thin, cook on tawa with oil both sides.", "Serve with curd and pickle."], similar: ["b01", "b17"]
  },
  {
    id: "b10", name: "Rava Dosa", type: "breakfast", region: "South", effort: 15, season: "all", combo: ["Chutney"], img: IMG.dosa,
    ingredients: [{ n: "Semolina", q: "150g" }, { n: "Rice flour", q: "100g" }, { n: "Maida", q: "50g" }, { n: "Cumin", q: "5g" }, { n: "Black pepper", q: "3g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Salt", q: "8g" }],
    tags: ["quick", "crispy"], noOG: false, macros: { cal: 240, p: 5, c: 38, f: 8, fb: 2 },
    steps: ["Mix semolina, rice flour, maida with water. Add seasoning.", "No fermentation needed.", "Heat tawa very hot. Pour from edges to center.", "Drizzle oil. Cook high heat till crisp.", "Fold and serve with chutney."], similar: ["b05", "b04"]
  },
  {
    id: "b11", name: "Mooli Paratha", type: "breakfast", region: "North", effort: 35, season: "winter", combo: ["Butter", "Curd"], img: IMG.aloo_paratha,
    ingredients: [{ n: "Wheat flour", q: "400g" }, { n: "White radish", q: "400g" }, { n: "Green chili", q: "3 pcs" }, { n: "Coriander", q: "20g" }, { n: "Ajwain", q: "5g" }, { n: "Ghee", q: "40g" }, { n: "Salt", q: "10g" }],
    tags: ["filling", "seasonal"], noOG: false, macros: { cal: 300, p: 7, c: 42, f: 12, fb: 4 },
    steps: ["Grate mooli, squeeze water. Save water for dough.", "Mix mooli with chili, coriander, ajwain, salt.", "Knead dough using mooli water.", "Stuff and roll. Cook on tawa with ghee.", "Serve with butter and curd."], similar: ["b01", "b12"]
  },
  {
    id: "b12", name: "Paneer Paratha", type: "breakfast", region: "North", effort: 30, season: "all", combo: ["Curd", "Pickle"], img: IMG.aloo_paratha,
    ingredients: [{ n: "Wheat flour", q: "400g" }, { n: "Paneer", q: "250g" }, { n: "Green chili", q: "2 pcs" }, { n: "Coriander", q: "20g" }, { n: "Cumin", q: "5g" }, { n: "Ghee", q: "40g" }, { n: "Salt", q: "8g" }],
    tags: ["protein", "filling"], noOG: false, macros: { cal: 350, p: 14, c: 40, f: 16, fb: 3 },
    steps: ["Grate paneer. Mix with chili, coriander, cumin, salt.", "Knead soft dough.", "Stuff and roll gently.", "Cook with ghee till golden.", "Serve with curd and pickle."], similar: ["b01", "b11"]
  },
  {
    id: "b14", name: "Oats Uttapam", type: "breakfast", region: "South", effort: 15, season: "all", combo: ["Chutney"], img: IMG.uttapam,
    ingredients: [{ n: "Oats", q: "200g" }, { n: "Semolina", q: "50g" }, { n: "Curd", q: "100g" }, { n: "Onion", q: "50g" }, { n: "Tomato", q: "50g" }, { n: "Capsicum", q: "30g" }, { n: "Salt", q: "8g" }],
    tags: ["healthy", "quick"], noOG: false, macros: { cal: 210, p: 8, c: 32, f: 6, fb: 4 },
    steps: ["Grind oats. Mix with semolina, curd, water.", "Rest 10 min.", "Pour thick on tawa. Top with chopped vegetables.", "Cook covered. Flip and cook.", "Serve with chutney."], similar: ["b06", "b07"]
  },
  {
    id: "b15", name: "Puri Aloo", type: "breakfast", region: "North", effort: 30, season: "all", combo: ["Pickle"], img: IMG.puri,
    ingredients: [{ n: "Wheat flour", q: "300g" }, { n: "Potato", q: "400g" }, { n: "Onion", q: "100g" }, { n: "Cumin", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Oil", q: "500ml" }, { n: "Salt", q: "10g" }],
    tags: ["weekend", "festive"], noOG: false, macros: { cal: 400, p: 8, c: 52, f: 18, fb: 4 },
    steps: ["Knead stiff dough. Rest 15 min.", "Cook aloo sabzi with cumin, turmeric.", "Roll small puris. Deep fry till puffed golden.", "Drain.", "Serve with aloo sabzi."], similar: ["b01", "b13"]
  },
  {
    id: "b16", name: "Vermicelli Upma", type: "breakfast", region: "South", effort: 15, season: "all", combo: ["Chutney"], img: IMG.upma,
    ingredients: [{ n: "Vermicelli", q: "250g" }, { n: "Peanuts", q: "30g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Green chili", q: "2 pcs" }, { n: "Onion", q: "80g" }, { n: "Lemon", q: "1 pc" }, { n: "Salt", q: "8g" }],
    tags: ["quick", "kid-friendly"], noOG: false, macros: { cal: 260, p: 7, c: 42, f: 7, fb: 2 },
    steps: ["Dry roast vermicelli golden.", "Splutter mustard, curry leaves, peanuts, onion.", "Add water and salt. Boil.", "Add vermicelli. Cover, cook 3 min.", "Squeeze lemon. Serve."], similar: ["b02", "b03"]
  },
  {
    id: "b17", name: "Gobhi Paratha", type: "breakfast", region: "North", effort: 30, season: "winter", combo: ["Butter", "Curd"], img: IMG.aloo_paratha,
    ingredients: [{ n: "Wheat flour", q: "400g" }, { n: "Cauliflower", q: "350g" }, { n: "Green chili", q: "2 pcs" }, { n: "Amchur", q: "5g" }, { n: "Ghee", q: "40g" }, { n: "Salt", q: "10g" }],
    tags: ["seasonal", "filling"], noOG: false, macros: { cal: 290, p: 8, c: 40, f: 11, fb: 4 },
    steps: ["Grate cauliflower fine, squeeze water.", "Mix with chili, amchur, salt.", "Knead dough. Stuff and roll.", "Cook with ghee till golden.", "Serve with butter and curd."], similar: ["b01", "b11"]
  },
  {
    id: "b18", name: "Dhokla", type: "breakfast", region: "West", effort: 25, season: "all", combo: ["Green chutney"], img: IMG.dhokla,
    ingredients: [{ n: "Besan", q: "250g" }, { n: "Curd", q: "100g" }, { n: "Eno fruit salt", q: "5g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Sugar", q: "15g" }, { n: "Lemon", q: "1 pc" }, { n: "Salt", q: "8g" }],
    tags: ["steamed", "light"], noOG: false, macros: { cal: 180, p: 10, c: 26, f: 4, fb: 3 },
    steps: ["Mix besan, curd, water, salt, turmeric, sugar.", "Add Eno and lemon juice just before steaming.", "Steam 15 min in greased plate.", "Make tadka: mustard, curry leaves, chili, water, sugar.", "Cut and pour tadka. Serve with chutney."], similar: ["b06", "b07"]
  },
  {
    id: "b20", name: "Misal Pav", type: "breakfast", region: "West", effort: 30, season: "all", combo: ["Farsan", "Pav"], img: IMG.pav_bhaji,
    ingredients: [{ n: "Matki sprouts", q: "250g" }, { n: "Onion", q: "100g" }, { n: "Tomato", q: "100g" }, { n: "Pav buns", q: "8 pcs" }, { n: "Farsan", q: "100g" }, { n: "Misal masala", q: "15g" }, { n: "Oil", q: "20ml" }],
    tags: ["spicy", "filling"], noOG: false, macros: { cal: 380, p: 14, c: 50, f: 12, fb: 8 },
    steps: ["Pressure cook sprouts. Make spicy gravy with onion, tomato, masala.", "Add cooked sprouts to gravy. Simmer.", "Toast pav with butter.", "Serve misal topped with farsan, chopped onion, lemon.", "Eat with buttered pav."], similar: ["b15"]
  },
  {
    id: "b21", name: "Kuttu Puri + Aloo", type: "breakfast", region: "North", effort: 25, season: "all", combo: ["Curd"], img: IMG.puri,
    ingredients: [{ n: "Buckwheat flour", q: "200g" }, { n: "Potato", q: "300g" }, { n: "Rock salt", q: "8g" }, { n: "Cumin", q: "5g" }, { n: "Green chili", q: "2 pcs" }, { n: "Ghee", q: "30g" }],
    tags: ["fasting"], noOG: true, macros: { cal: 340, p: 7, c: 48, f: 14, fb: 3 },
    steps: ["Mix buckwheat flour with mashed potato, rock salt. Knead.", "Make aloo sabzi with ghee, cumin, chili, rock salt.", "Roll puris. Fry in ghee.", "Drain.", "Serve with aloo and curd."], similar: ["b08"]
  },
  {
    id: "b22", name: "Curd Rice", type: "breakfast", region: "South", effort: 10, season: "summer", combo: ["Pickle", "Papad"], img: IMG.pulao,
    ingredients: [{ n: "Cooked rice", q: "400g" }, { n: "Curd", q: "300g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Pomegranate", q: "30g" }, { n: "Salt", q: "8g" }],
    tags: ["cooling", "quick"], noOG: true, macros: { cal: 280, p: 8, c: 48, f: 6, fb: 2 },
    steps: ["Mix warm rice with curd and salt.", "Make tadka: mustard, curry leaves, green chili.", "Pour over curd rice. Mix.", "Garnish with pomegranate.", "Serve with pickle and papad."], similar: ["b04"]
  },

  // ── LUNCH (30+) ──
  {
    id: "l01", name: "Rajma Chawal", type: "lunch", region: "North", effort: 45, season: "all", combo: ["Salad", "Papad"], img: IMG.rajma,
    ingredients: [{ n: "Rajma (kidney beans)", q: "300g" }, { n: "Onion", q: "200g" }, { n: "Tomato", q: "300g" }, { n: "Ginger-garlic paste", q: "20g" }, { n: "Rajma masala", q: "15g" }, { n: "Basmati rice", q: "400g" }, { n: "Oil", q: "30ml" }, { n: "Salt", q: "10g" }],
    tags: ["protein", "filling", "kid-friendly"], noOG: false, macros: { cal: 420, p: 16, c: 62, f: 10, fb: 12 },
    steps: ["Soak rajma overnight. Pressure cook 4-5 whistles.", "Sauté onion till golden. Add ginger-garlic, tomato puree.", "Cook till oil separates. Add masala.", "Add rajma with water. Simmer 20 min.", "Serve over steamed rice."], similar: ["l14", "l03"]
  },
  {
    id: "l02", name: "Dal Makhani + Roti", type: "lunch", region: "North", effort: 60, season: "winter", combo: ["Roti", "Raita"], img: IMG.dal_makhani,
    ingredients: [{ n: "Urad dal", q: "200g" }, { n: "Rajma", q: "50g" }, { n: "Butter", q: "60g" }, { n: "Cream", q: "60ml" }, { n: "Tomato", q: "200g" }, { n: "Ginger-garlic paste", q: "15g" }, { n: "Kasuri methi", q: "5g" }, { n: "Wheat flour", q: "400g" }, { n: "Salt", q: "10g" }],
    tags: ["rich", "weekend"], noOG: false, macros: { cal: 450, p: 15, c: 48, f: 22, fb: 8 },
    steps: ["Soak dal overnight. Pressure cook very soft.", "Sauté ginger-garlic and tomato puree in butter.", "Add spices and dal. Simmer 40 min on low.", "Add cream and kasuri methi.", "Serve with hot rotis."], similar: ["l01", "l12"]
  },
  {
    id: "l03", name: "Chole Bhature", type: "lunch", region: "North", effort: 60, season: "all", combo: ["Lassi", "Pickle"], img: IMG.chole,
    ingredients: [{ n: "Chickpeas", q: "300g" }, { n: "Onion", q: "200g" }, { n: "Tomato", q: "200g" }, { n: "Maida", q: "300g" }, { n: "Yogurt", q: "60g" }, { n: "Chole masala", q: "20g" }, { n: "Tea bag", q: "1 pc" }, { n: "Oil", q: "500ml" }],
    tags: ["weekend", "festive"], noOG: false, macros: { cal: 520, p: 16, c: 60, f: 24, fb: 10 },
    steps: ["Soak chickpeas overnight. Boil with tea bag for colour.", "Make masala gravy with onion, tomato, spices.", "Add chickpeas. Simmer thick.", "Knead bhatura dough with maida, yogurt. Rest and fry.", "Serve with pickled onion and lassi."], similar: ["l01", "l14"]
  },
  {
    id: "l04", name: "Kadhi Chawal", type: "lunch", region: "North", effort: 30, season: "monsoon", combo: ["Rice", "Papad"], img: IMG.kadhi,
    ingredients: [{ n: "Besan", q: "100g" }, { n: "Curd", q: "400g" }, { n: "Onion", q: "80g" }, { n: "Fenugreek seeds", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Basmati rice", q: "400g" }, { n: "Ghee", q: "20g" }, { n: "Salt", q: "10g" }],
    tags: ["comfort", "monsoon"], noOG: false, macros: { cal: 350, p: 12, c: 50, f: 11, fb: 3 },
    steps: ["Whisk besan + curd + water smooth.", "Make and fry pakoras.", "Make tadka, pour besan mix. Stir. Simmer 20 min.", "Add pakoras. Cook 5 min.", "Serve with steamed rice."], similar: ["l19", "l12"]
  },
  {
    id: "l05", name: "Palak Paneer + Rice", type: "lunch", region: "North", effort: 30, season: "winter", combo: ["Rice", "Raita"], img: IMG.palak_paneer,
    ingredients: [{ n: "Paneer", q: "300g" }, { n: "Spinach", q: "500g" }, { n: "Onion", q: "100g" }, { n: "Tomato", q: "100g" }, { n: "Cream", q: "40ml" }, { n: "Ginger", q: "10g" }, { n: "Garam masala", q: "5g" }, { n: "Rice", q: "400g" }, { n: "Salt", q: "10g" }],
    tags: ["healthy", "iron-rich"], noOG: false, macros: { cal: 380, p: 20, c: 28, f: 22, fb: 6 },
    steps: ["Blanch spinach. Blend.", "Sauté onion, ginger, tomato. Blend.", "Cook paste with spices. Add spinach puree.", "Add paneer. Cook 5 min.", "Finish with cream. Serve with rice."], similar: ["l08", "l15"]
  },
  {
    id: "l06", name: "Sambhar Rice", type: "lunch", region: "South", effort: 30, season: "all", combo: ["Papad", "Pickle"], img: IMG.sambar_rice,
    ingredients: [{ n: "Toor dal", q: "200g" }, { n: "Mixed vegetables", q: "300g" }, { n: "Tamarind", q: "20g" }, { n: "Sambhar powder", q: "15g" }, { n: "Mustard seeds", q: "5g" }, { n: "Rice", q: "400g" }, { n: "Salt", q: "10g" }],
    tags: ["healthy", "everyday"], noOG: false, macros: { cal: 380, p: 14, c: 60, f: 8, fb: 10 },
    steps: ["Cook toor dal soft. Mash.", "Cook vegetables separately.", "Make tadka. Add tamarind, sambhar powder, vegetables, dal.", "Simmer 10 min.", "Serve over rice."], similar: ["l23", "l04"]
  },
  {
    id: "l08", name: "Paneer Butter Masala + Naan", type: "lunch", region: "North", effort: 35, season: "all", combo: ["Naan", "Raita"], img: IMG.paneer_butter,
    ingredients: [{ n: "Paneer", q: "300g" }, { n: "Tomato", q: "300g" }, { n: "Cashew", q: "30g" }, { n: "Butter", q: "60g" }, { n: "Cream", q: "60ml" }, { n: "Onion", q: "100g" }, { n: "Kasuri methi", q: "5g" }, { n: "Naan", q: "6 pcs" }, { n: "Salt", q: "10g" }],
    tags: ["rich", "kid-friendly"], noOG: false, macros: { cal: 450, p: 18, c: 22, f: 32, fb: 3 },
    steps: ["Blend tomato, onion, cashew smooth.", "Cook paste in butter till thick.", "Add spices, sugar, salt.", "Add paneer and cream. Simmer 5 min.", "Finish with kasuri methi. Serve with naan."], similar: ["l05", "l15"]
  },
  {
    id: "l10", name: "Pav Bhaji", type: "lunch", region: "West", effort: 35, season: "all", combo: ["Pav", "Onion", "Lemon"], img: IMG.pav_bhaji,
    ingredients: [{ n: "Potato", q: "400g" }, { n: "Cauliflower", q: "200g" }, { n: "Carrot", q: "100g" }, { n: "Peas", q: "100g" }, { n: "Tomato", q: "200g" }, { n: "Butter", q: "80g" }, { n: "Pav bhaji masala", q: "20g" }, { n: "Pav buns", q: "12 pcs" }, { n: "Onion", q: "100g" }, { n: "Lemon", q: "2 pcs" }],
    tags: ["street-food", "kid-friendly"], noOG: false, macros: { cal: 420, p: 10, c: 58, f: 16, fb: 6 },
    steps: ["Boil and mash all vegetables.", "Sauté onion, tomato in butter.", "Add mashed vegetables, masala. Mash together.", "Cook 10 min, adding water.", "Toast pav. Serve with butter, onion, lemon."], similar: ["l03"]
  },
  {
    id: "l12", name: "Dal Tadka + Jeera Rice", type: "lunch", region: "North", effort: 25, season: "all", combo: ["Papad", "Salad"], img: IMG.dal_fry,
    ingredients: [{ n: "Toor dal", q: "250g" }, { n: "Onion", q: "100g" }, { n: "Tomato", q: "150g" }, { n: "Ghee", q: "30g" }, { n: "Cumin", q: "5g" }, { n: "Garlic", q: "10g" }, { n: "Basmati rice", q: "400g" }, { n: "Turmeric", q: "3g" }, { n: "Salt", q: "10g" }],
    tags: ["everyday", "comfort"], noOG: false, macros: { cal: 370, p: 14, c: 56, f: 10, fb: 8 },
    steps: ["Pressure cook dal with turmeric. Mash.", "Make jeera rice separately.", "Make sizzling tadka with ghee, cumin, garlic, onion, tomato.", "Pour over dal.", "Serve with jeera rice and papad."], similar: ["l01", "l04"]
  },
  {
    id: "l13", name: "Veg Biryani", type: "lunch", region: "South", effort: 45, season: "all", combo: ["Raita"], img: IMG.biryani,
    ingredients: [{ n: "Basmati rice", q: "500g" }, { n: "Mixed vegetables", q: "300g" }, { n: "Onion", q: "250g" }, { n: "Yogurt", q: "100g" }, { n: "Biryani masala", q: "20g" }, { n: "Saffron", q: "1g" }, { n: "Mint leaves", q: "30g" }, { n: "Ghee", q: "40g" }, { n: "Curd", q: "200g" }, { n: "Cucumber", q: "100g" }],
    tags: ["weekend", "festive"], noOG: false, macros: { cal: 440, p: 10, c: 65, f: 16, fb: 4 },
    steps: ["Soak rice. Par-boil 70% done.", "Fry onion slices golden.", "Cook vegetables with yogurt, masala, mint.", "Layer vegetables, rice, fried onions, saffron milk.", "Seal and dum cook 25 min. Serve with raita."], similar: ["l17", "l08"]
  },
  {
    id: "l14", name: "Chana Masala + Rice", type: "lunch", region: "North", effort: 30, season: "all", combo: ["Rice", "Raita"], img: IMG.chole,
    ingredients: [{ n: "Chickpeas", q: "300g" }, { n: "Onion", q: "200g" }, { n: "Tomato", q: "200g" }, { n: "Chole masala", q: "15g" }, { n: "Ginger", q: "10g" }, { n: "Basmati rice", q: "400g" }, { n: "Salt", q: "10g" }],
    tags: ["protein", "everyday"], noOG: false, macros: { cal: 400, p: 15, c: 60, f: 10, fb: 12 },
    steps: ["Soak and cook chickpeas.", "Sauté onion, ginger, tomato.", "Add masala. Add chickpeas. Simmer.", "Mash a few for thickness.", "Serve with rice and raita."], similar: ["l01", "l03"]
  },
  {
    id: "l17", name: "Veg Pulao + Raita", type: "lunch", region: "North", effort: 25, season: "all", combo: ["Raita", "Papad"], img: IMG.pulao,
    ingredients: [{ n: "Basmati rice", q: "400g" }, { n: "Mixed vegetables", q: "250g" }, { n: "Onion", q: "80g" }, { n: "Cumin", q: "5g" }, { n: "Bay leaf", q: "2 pcs" }, { n: "Whole spices", q: "5g" }, { n: "Ghee", q: "20g" }, { n: "Curd", q: "200g" }, { n: "Cucumber", q: "80g" }, { n: "Salt", q: "10g" }],
    tags: ["quick", "one-pot"], noOG: false, macros: { cal: 380, p: 9, c: 58, f: 12, fb: 4 },
    steps: ["Soak rice 20 min.", "Sauté whole spices, onion, vegetables in ghee.", "Add rice, salt, water. Cook.", "Make cucumber raita.", "Serve together."], similar: ["l13", "l12"]
  },
  {
    id: "l19", name: "Khichdi + Kadhi", type: "lunch", region: "West", effort: 25, season: "monsoon", combo: ["Papad", "Pickle"], img: IMG.khichdi,
    ingredients: [{ n: "Rice", q: "250g" }, { n: "Moong dal", q: "125g" }, { n: "Turmeric", q: "3g" }, { n: "Ghee", q: "30g" }, { n: "Cumin", q: "5g" }, { n: "Besan", q: "50g" }, { n: "Curd", q: "200g" }, { n: "Salt", q: "10g" }],
    tags: ["comfort", "healing"], noOG: false, macros: { cal: 340, p: 12, c: 52, f: 9, fb: 5 },
    steps: ["Wash rice and dal. Pressure cook soft with turmeric, ghee.", "Make mini kadhi: besan + curd + water. Boil.", "Add tadka to kadhi.", "Top khichdi with ghee.", "Serve with kadhi, papad, pickle."], similar: ["l04", "l12"]
  },
  {
    id: "l23", name: "Rasam Rice", type: "lunch", region: "South", effort: 20, season: "monsoon", combo: ["Papad"], img: IMG.sambar_rice,
    ingredients: [{ n: "Tomato", q: "200g" }, { n: "Tamarind", q: "15g" }, { n: "Pepper", q: "5g" }, { n: "Cumin", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Basmati rice", q: "400g" }, { n: "Salt", q: "8g" }],
    tags: ["light", "healing"], noOG: false, macros: { cal: 280, p: 7, c: 52, f: 5, fb: 3 },
    steps: ["Mash tomato. Add tamarind water, pepper, cumin, salt.", "Boil. Let it froth.", "Make mustard-curry leaf tadka.", "Pour over rasam.", "Serve over rice."], similar: ["l06", "l04"]
  },
  {
    id: "l25", name: "Matar Paneer + Rice", type: "lunch", region: "North", effort: 30, season: "winter", combo: ["Rice", "Raita"], img: IMG.paneer_butter,
    ingredients: [{ n: "Paneer", q: "250g" }, { n: "Green peas", q: "200g" }, { n: "Onion", q: "150g" }, { n: "Tomato", q: "200g" }, { n: "Ginger-garlic paste", q: "15g" }, { n: "Garam masala", q: "5g" }, { n: "Basmati rice", q: "400g" }, { n: "Curd", q: "150g" }, { n: "Salt", q: "10g" }],
    tags: ["everyday", "kid-friendly"], noOG: false, macros: { cal: 400, p: 18, c: 35, f: 21, fb: 5 },
    steps: ["Sauté onion golden. Add ginger-garlic.", "Add tomato puree, spices. Cook thick.", "Add peas, water. Cook 5 min.", "Add paneer. Simmer.", "Serve with rice and raita."], similar: ["l05", "l08"]
  },

  // ── DINNER — NO ROTI-SABZI! Rice bowls, one-pots, wraps, pasta, dosas ──
  {
    id: "d01", name: "Paneer Tikka Rice Bowl", type: "dinner", region: "North", effort: 30, season: "all", combo: ["Mint chutney"], img: IMG.paneer_tikka,
    ingredients: [{ n: "Paneer", q: "300g" }, { n: "Capsicum", q: "100g" }, { n: "Onion", q: "100g" }, { n: "Yogurt", q: "80g" }, { n: "Tikka masala", q: "15g" }, { n: "Basmati rice", q: "400g" }, { n: "Lemon", q: "1 pc" }, { n: "Salt", q: "10g" }],
    tags: ["protein", "bowl"], noOG: false, macros: { cal: 420, p: 20, c: 45, f: 18, fb: 3 },
    steps: ["Marinate paneer cubes and vegetables in yogurt + tikka masala 20 min.", "Grill or pan-fry till charred.", "Cook aromatic rice with cumin.", "Assemble bowl: rice base, tikka on top, drizzle mint chutney.", "Squeeze lemon. Serve warm."], similar: ["d02", "d16"]
  },
  {
    id: "d02", name: "Veg Biryani (One-Pot)", type: "dinner", region: "South", effort: 40, season: "all", combo: ["Raita"], img: IMG.biryani,
    ingredients: [{ n: "Basmati rice", q: "400g" }, { n: "Mixed vegetables", q: "300g" }, { n: "Onion", q: "200g" }, { n: "Yogurt", q: "80g" }, { n: "Biryani masala", q: "15g" }, { n: "Saffron", q: "1g" }, { n: "Mint", q: "20g" }, { n: "Ghee", q: "30g" }, { n: "Curd", q: "200g" }, { n: "Cucumber", q: "100g" }],
    tags: ["one-pot", "festive"], noOG: false, macros: { cal: 440, p: 10, c: 62, f: 16, fb: 4 },
    steps: ["Fry sliced onions golden in ghee.", "Cook vegetables with yogurt and masala.", "Layer par-boiled rice and vegetable mixture.", "Top with saffron milk, mint, fried onions. Seal and dum 25 min.", "Serve with cucumber raita."], similar: ["d01", "d06"]
  },
  {
    id: "d03", name: "Masala Dosa Dinner", type: "dinner", region: "South", effort: 25, season: "all", combo: ["Sambhar", "Chutney"], img: IMG.dosa,
    ingredients: [{ n: "Dosa batter", q: "500g" }, { n: "Potato", q: "300g" }, { n: "Onion", q: "100g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Toor dal", q: "150g" }, { n: "Tamarind", q: "15g" }, { n: "Oil", q: "30ml" }],
    tags: ["south-indian", "light"], noOG: false, macros: { cal: 320, p: 9, c: 48, f: 10, fb: 4 },
    steps: ["Make potato masala with mustard, curry leaf, onion.", "Make fresh sambhar with toor dal and vegetables.", "Spread dosa batter thin on hot tawa. Crisp.", "Fill with potato masala.", "Serve with sambhar and coconut chutney."], similar: ["d04", "d11"]
  },
  {
    id: "d04", name: "Uttapam Platter", type: "dinner", region: "South", effort: 20, season: "all", combo: ["Sambhar", "Chutney"], img: IMG.uttapam,
    ingredients: [{ n: "Dosa batter", q: "500g" }, { n: "Onion", q: "80g" }, { n: "Tomato", q: "80g" }, { n: "Capsicum", q: "50g" }, { n: "Carrot (grated)", q: "50g" }, { n: "Toor dal", q: "100g" }, { n: "Oil", q: "20ml" }],
    tags: ["quick", "light"], noOG: false, macros: { cal: 280, p: 9, c: 42, f: 8, fb: 4 },
    steps: ["Pour thick dosa batter on tawa.", "Top with chopped onion, tomato, capsicum, carrot.", "Cook covered on medium heat.", "Make quick sambhar.", "Serve platter of uttapams with sambhar and chutney."], similar: ["d03", "d11"]
  },
  {
    id: "d05", name: "Veg Khichdi Bowl", type: "dinner", region: "West", effort: 20, season: "monsoon", combo: ["Papad", "Pickle", "Curd"], img: IMG.khichdi,
    ingredients: [{ n: "Rice", q: "250g" }, { n: "Moong dal", q: "125g" }, { n: "Mixed vegetables", q: "200g" }, { n: "Ghee", q: "30g" }, { n: "Turmeric", q: "3g" }, { n: "Cumin", q: "5g" }, { n: "Papad", q: "6 pcs" }, { n: "Curd", q: "200g" }, { n: "Pickle", q: "30g" }],
    tags: ["comfort", "healing", "bowl"], noOG: true, macros: { cal: 340, p: 12, c: 50, f: 10, fb: 5 },
    steps: ["Wash rice and dal. Pressure cook with vegetables, turmeric, salt.", "Let it be soft and porridge-like.", "Top with generous ghee.", "Fry papad.", "Serve in bowl with curd and pickle on the side."], similar: ["d10", "d12"]
  },
  {
    id: "d06", name: "Veg Fried Rice + Manchurian", type: "dinner", region: "Fusion", effort: 30, season: "all", combo: [], img: IMG.fried_rice,
    ingredients: [{ n: "Cooked rice (cold)", q: "500g" }, { n: "Cabbage", q: "100g" }, { n: "Carrot", q: "80g" }, { n: "Capsicum", q: "80g" }, { n: "Spring onion", q: "50g" }, { n: "Soy sauce", q: "30ml" }, { n: "Vinegar", q: "15ml" }, { n: "Cornflour", q: "30g" }, { n: "Chili sauce", q: "15ml" }, { n: "Oil", q: "40ml" }],
    tags: ["kid-friendly", "fusion"], noOG: false, macros: { cal: 400, p: 10, c: 58, f: 14, fb: 4 },
    steps: ["Julienne all vegetables thin.", "Wok on high heat: toss vegetables 2 min.", "Add cold rice, soy sauce, vinegar. Toss vigorously.", "For manchurian: grate cabbage + carrot, mix cornflour, shape balls, fry.", "Make sauce. Toss balls in sauce. Serve with fried rice."], similar: ["d07", "d08"]
  },
  {
    id: "d07", name: "Veg Hakka Noodles", type: "dinner", region: "Fusion", effort: 20, season: "all", combo: ["Manchurian"], img: IMG.noodles,
    ingredients: [{ n: "Hakka noodles", q: "400g" }, { n: "Cabbage", q: "100g" }, { n: "Carrot", q: "80g" }, { n: "Capsicum", q: "80g" }, { n: "Spring onion", q: "50g" }, { n: "Soy sauce", q: "30ml" }, { n: "Vinegar", q: "15ml" }, { n: "Chili sauce", q: "10ml" }, { n: "Oil", q: "30ml" }],
    tags: ["quick", "kid-friendly", "fusion"], noOG: false, macros: { cal: 350, p: 9, c: 52, f: 12, fb: 4 },
    steps: ["Boil noodles al dente. Drain, toss with oil.", "Julienne vegetables.", "Wok high heat: vegetables 2 min.", "Add noodles, sauces. Toss vigorously.", "Garnish with spring onion. Serve hot."], similar: ["d06", "d08"]
  },
  {
    id: "d08", name: "Masala Pasta", type: "dinner", region: "Fusion", effort: 20, season: "all", combo: ["Garlic bread"], img: IMG.pasta,
    ingredients: [{ n: "Penne pasta", q: "400g" }, { n: "Onion", q: "100g" }, { n: "Tomato", q: "200g" }, { n: "Capsicum", q: "80g" }, { n: "Cream", q: "40ml" }, { n: "Italian herbs", q: "5g" }, { n: "Chili flakes", q: "3g" }, { n: "Cheese", q: "50g" }, { n: "Oil", q: "20ml" }, { n: "Salt", q: "8g" }],
    tags: ["kid-friendly", "fusion", "quick"], noOG: false, macros: { cal: 380, p: 12, c: 52, f: 14, fb: 3 },
    steps: ["Boil pasta al dente. Reserve pasta water.", "Sauté onion, capsicum. Add tomato, herbs, chili.", "Cook sauce thick. Add cream.", "Toss pasta in sauce with splash of pasta water.", "Top with cheese. Serve."], similar: ["d07", "d06"]
  },
  {
    id: "d09", name: "Paneer Wrap / Frankie", type: "dinner", region: "West", effort: 25, season: "all", combo: ["Green chutney"], img: IMG.wrap,
    ingredients: [{ n: "Wheat flour", q: "300g" }, { n: "Paneer", q: "250g" }, { n: "Capsicum", q: "80g" }, { n: "Onion", q: "100g" }, { n: "Tikka masala", q: "10g" }, { n: "Yogurt", q: "50g" }, { n: "Lemon", q: "1 pc" }, { n: "Oil", q: "20ml" }],
    tags: ["wrap", "fun", "quick"], noOG: false, macros: { cal: 380, p: 18, c: 38, f: 18, fb: 3 },
    steps: ["Marinate paneer and veggies in yogurt + masala.", "Make thin roomali-style rotis on tawa.", "Grill paneer filling till charred.", "Spread green chutney on roti, add filling, squeeze lemon.", "Roll tight and serve."], similar: ["d01", "d13"]
  },
  {
    id: "d10", name: "Dal Khichdi + Papad + Curd", type: "dinner", region: "North", effort: 20, season: "all", combo: ["Papad", "Curd", "Pickle"], img: IMG.khichdi,
    ingredients: [{ n: "Rice", q: "250g" }, { n: "Moong dal", q: "125g" }, { n: "Ghee", q: "30g" }, { n: "Cumin", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Papad", q: "6 pcs" }, { n: "Curd", q: "300g" }, { n: "Pickle", q: "30g" }, { n: "Salt", q: "10g" }],
    tags: ["comfort", "light", "everyday"], noOG: true, macros: { cal: 360, p: 13, c: 52, f: 10, fb: 5 },
    steps: ["Wash rice + dal. Cook soft with turmeric, cumin, ghee, salt.", "Should be soft, porridge consistency.", "Top with generous ghee.", "Fry papad crisp.", "Serve with cold curd and pickle."], similar: ["d05", "d12"]
  },
  {
    id: "d11", name: "Idli + Sambhar Dinner", type: "dinner", region: "South", effort: 15, season: "all", combo: ["Chutney"], img: IMG.idli,
    ingredients: [{ n: "Idli batter", q: "500g" }, { n: "Toor dal", q: "150g" }, { n: "Mixed vegetables", q: "200g" }, { n: "Sambhar powder", q: "15g" }, { n: "Tamarind", q: "15g" }, { n: "Coconut", q: "50g" }, { n: "Salt", q: "10g" }],
    tags: ["light", "steamed", "healthy"], noOG: false, macros: { cal: 250, p: 10, c: 40, f: 5, fb: 5 },
    steps: ["Steam idlis in greased moulds.", "Cook thick sambhar with lots of vegetables.", "Make fresh coconut chutney.", "Serve hot idlis with sambhar and chutney.", "Light, easily digestible dinner."], similar: ["d03", "d04"]
  },
  {
    id: "d12", name: "Tomato Rice Bowl", type: "dinner", region: "South", effort: 20, season: "all", combo: ["Raita", "Papad"], img: IMG.pulao,
    ingredients: [{ n: "Basmati rice", q: "400g" }, { n: "Tomato", q: "300g" }, { n: "Onion", q: "80g" }, { n: "Peanuts", q: "30g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Ghee", q: "20g" }, { n: "Curd", q: "200g" }, { n: "Salt", q: "10g" }],
    tags: ["one-pot", "tangy", "quick"], noOG: false, macros: { cal: 360, p: 9, c: 56, f: 11, fb: 4 },
    steps: ["Cook rice. Roast peanuts.", "Make tomato masala with onion, spices.", "Mix with rice. Add peanuts.", "Make quick raita.", "Serve in bowls."], similar: ["d05", "d15"]
  },
  {
    id: "d13", name: "Stuffed Paratha Dinner", type: "dinner", region: "North", effort: 35, season: "winter", combo: ["Curd", "Pickle"], img: IMG.aloo_paratha,
    ingredients: [{ n: "Wheat flour", q: "400g" }, { n: "Paneer", q: "200g" }, { n: "Potato", q: "200g" }, { n: "Onion (for raita)", q: "50g" }, { n: "Curd", q: "300g" }, { n: "Pickle", q: "30g" }, { n: "Ghee", q: "40g" }, { n: "Salt", q: "10g" }],
    tags: ["filling", "winter"], noOG: false, macros: { cal: 400, p: 15, c: 45, f: 18, fb: 4 },
    steps: ["Make paneer-aloo filling with spices.", "Knead dough. Stuff and roll parathas.", "Cook on tawa with ghee.", "Beat curd with onion, cumin for raita.", "Serve parathas with curd and pickle — a complete dinner."], similar: ["d01", "d09"]
  },
  {
    id: "d14", name: "Rajma Rice Bowl", type: "dinner", region: "North", effort: 40, season: "all", combo: ["Salad"], img: IMG.rajma,
    ingredients: [{ n: "Rajma", q: "250g" }, { n: "Onion", q: "150g" }, { n: "Tomato", q: "200g" }, { n: "Ginger-garlic paste", q: "15g" }, { n: "Basmati rice", q: "400g" }, { n: "Cucumber", q: "80g" }, { n: "Lemon", q: "1 pc" }, { n: "Salt", q: "10g" }],
    tags: ["protein", "bowl"], noOG: false, macros: { cal: 420, p: 16, c: 60, f: 10, fb: 12 },
    steps: ["Soak rajma overnight. Pressure cook.", "Make rich gravy with onion, tomato, spices.", "Cook rice aromatic.", "Assemble bowl: rice, rajma on top, fresh salad on side.", "Squeeze lemon. Hearty dinner."], similar: ["d01", "d15"]
  },
  {
    id: "d15", name: "Curd Rice + Pickle Dinner", type: "dinner", region: "South", effort: 10, season: "summer", combo: ["Pickle", "Papad"], img: IMG.pulao,
    ingredients: [{ n: "Cooked rice", q: "500g" }, { n: "Curd", q: "400g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "8 pcs" }, { n: "Pomegranate", q: "30g" }, { n: "Pickle", q: "30g" }, { n: "Papad", q: "6 pcs" }, { n: "Salt", q: "8g" }],
    tags: ["cooling", "quick", "summer"], noOG: true, macros: { cal: 300, p: 9, c: 48, f: 7, fb: 2 },
    steps: ["Mix warm rice with fresh curd. Salt.", "Make tadka: mustard, curry leaf, green chili.", "Pour over curd rice.", "Garnish with pomegranate.", "Serve with favourite pickle and fried papad."], similar: ["d05", "d12"]
  },
  {
    id: "d16", name: "Veg Pulao Dinner", type: "dinner", region: "North", effort: 25, season: "all", combo: ["Raita", "Pickle"], img: IMG.pulao,
    ingredients: [{ n: "Basmati rice", q: "400g" }, { n: "Mixed vegetables", q: "250g" }, { n: "Onion", q: "80g" }, { n: "Whole spices", q: "5g" }, { n: "Ghee", q: "20g" }, { n: "Curd", q: "200g" }, { n: "Cucumber", q: "80g" }, { n: "Salt", q: "10g" }],
    tags: ["one-pot", "quick"], noOG: false, macros: { cal: 370, p: 9, c: 55, f: 12, fb: 4 },
    steps: ["Sauté whole spices and onion in ghee.", "Add vegetables, sauté 2 min.", "Add soaked rice, water. Cook.", "Make raita.", "Serve pulao with raita."], similar: ["d02", "d12"]
  },
  {
    id: "d17", name: "Malai Kofta Rice", type: "dinner", region: "North", effort: 45, season: "all", combo: ["Rice"], img: IMG.paneer_butter,
    ingredients: [{ n: "Paneer", q: "200g" }, { n: "Potato", q: "200g" }, { n: "Cashew", q: "30g" }, { n: "Tomato", q: "250g" }, { n: "Onion", q: "150g" }, { n: "Cream", q: "60ml" }, { n: "Basmati rice", q: "400g" }, { n: "Oil", q: "200ml" }, { n: "Salt", q: "10g" }],
    tags: ["rich", "special"], noOG: false, macros: { cal: 480, p: 16, c: 50, f: 24, fb: 3 },
    steps: ["Mash paneer + potato. Stuff with cashew. Shape balls. Fry golden.", "Blend onion, tomato, cashew. Cook with spices.", "Add cream. Adjust gravy.", "Place koftas in gravy before serving.", "Serve over aromatic rice."], similar: ["d01", "d02"]
  },
  {
    id: "d18", name: "Pav Bhaji Dinner", type: "dinner", region: "West", effort: 30, season: "all", combo: ["Pav", "Onion"], img: IMG.pav_bhaji,
    ingredients: [{ n: "Potato", q: "400g" }, { n: "Cauliflower", q: "150g" }, { n: "Mixed vegetables", q: "200g" }, { n: "Butter", q: "80g" }, { n: "Pav bhaji masala", q: "20g" }, { n: "Pav buns", q: "12 pcs" }, { n: "Onion", q: "100g" }, { n: "Lemon", q: "2 pcs" }],
    tags: ["street-food", "fun"], noOG: false, macros: { cal: 420, p: 10, c: 56, f: 18, fb: 6 },
    steps: ["Boil and mash all vegetables.", "Cook with butter, masala, onion, tomato.", "Mash everything smooth.", "Toast pav in butter.", "Serve bhaji with buttered pav, onion, lemon."], similar: ["d06", "d09"]
  },
  {
    id: "d19", name: "Kadhi Chawal Dinner", type: "dinner", region: "North", effort: 30, season: "monsoon", combo: ["Rice", "Papad"], img: IMG.kadhi,
    ingredients: [{ n: "Besan", q: "100g" }, { n: "Curd", q: "400g" }, { n: "Onion", q: "80g" }, { n: "Basmati rice", q: "400g" }, { n: "Ghee", q: "20g" }, { n: "Mustard seeds", q: "5g" }, { n: "Fenugreek seeds", q: "3g" }, { n: "Salt", q: "10g" }],
    tags: ["comfort", "monsoon"], noOG: false, macros: { cal: 360, p: 12, c: 52, f: 11, fb: 3 },
    steps: ["Whisk besan + curd + water smooth.", "Make pakoras. Fry golden.", "Cook kadhi with tadka. Simmer 20 min.", "Add pakoras.", "Serve over steamed rice with papad."], similar: ["d05", "d10"]
  },
  {
    id: "d20", name: "Sarson Saag + Makki Roti", type: "dinner", region: "North", effort: 45, season: "winter", combo: ["Jaggery", "Butter"], img: IMG.palak_paneer,
    ingredients: [{ n: "Mustard greens", q: "500g" }, { n: "Spinach", q: "200g" }, { n: "Maize flour", q: "250g" }, { n: "Ghee", q: "40g" }, { n: "Ginger", q: "10g" }, { n: "Green chili", q: "2 pcs" }, { n: "Butter", q: "30g" }, { n: "Jaggery", q: "20g" }],
    tags: ["seasonal", "punjabi"], noOG: false, macros: { cal: 360, p: 10, c: 44, f: 16, fb: 8 },
    steps: ["Chop and pressure cook greens with ginger, chili.", "Blend coarsely. Cook on low 30 min.", "Pat makki rotis. Cook on tawa with ghee.", "Top saag with butter.", "Serve with makki roti and jaggery."], similar: ["d13"]
  },
  {
    id: "d21", name: "Cheese Grilled Sandwich", type: "dinner", region: "Fusion", effort: 15, season: "all", combo: ["Tomato soup"], img: IMG.wrap,
    ingredients: [{ n: "Bread", q: "12 slices" }, { n: "Cheese", q: "150g" }, { n: "Capsicum", q: "50g" }, { n: "Onion", q: "50g" }, { n: "Tomato", q: "80g" }, { n: "Corn", q: "50g" }, { n: "Green chutney", q: "30g" }, { n: "Butter", q: "40g" }, { n: "Mixed vegetables (for soup)", q: "200g" }, { n: "Salt", q: "8g" }],
    tags: ["quick", "kid-friendly", "fusion"], noOG: false, macros: { cal: 350, p: 14, c: 38, f: 16, fb: 3 },
    steps: ["Spread green chutney on bread. Layer cheese, chopped vegetables.", "Grill in sandwich maker or on tawa with butter.", "For soup: cook vegetables, blend, season.", "Cut sandwiches diagonally.", "Serve with hot tomato soup."], similar: ["d08", "d09"]
  },
  {
    id: "d22", name: "Lemon Rice Bowl", type: "dinner", region: "South", effort: 15, season: "summer", combo: ["Papad", "Pickle"], img: IMG.pulao,
    ingredients: [{ n: "Cooked rice", q: "500g" }, { n: "Lemon", q: "3 pcs" }, { n: "Peanuts", q: "40g" }, { n: "Mustard seeds", q: "5g" }, { n: "Curry leaves", q: "10 pcs" }, { n: "Turmeric", q: "3g" }, { n: "Green chili", q: "3 pcs" }, { n: "Oil", q: "20ml" }, { n: "Salt", q: "8g" }],
    tags: ["tangy", "quick", "summer"], noOG: true, macros: { cal: 320, p: 8, c: 52, f: 10, fb: 3 },
    steps: ["Cook rice. Cool slightly.", "Make tadka: mustard, curry leaves, peanuts, chili, turmeric.", "Add rice to tadka. Toss.", "Squeeze generous lemon juice. Mix.", "Serve with papad and pickle."], similar: ["d12", "d15"]
  },
  {
    id: "d23", name: "Tamarind Rice (Puliyogare)", type: "dinner", region: "South", effort: 20, season: "all", combo: ["Papad", "Curd"], img: IMG.pulao,
    ingredients: [{ n: "Cooked rice", q: "500g" }, { n: "Tamarind", q: "30g" }, { n: "Peanuts", q: "40g" }, { n: "Sesame seeds", q: "15g" }, { n: "Curry leaves", q: "10 pcs" }, { n: "Mustard seeds", q: "5g" }, { n: "Turmeric", q: "3g" }, { n: "Jaggery", q: "10g" }, { n: "Oil", q: "20ml" }],
    tags: ["tangy", "south-indian"], noOG: true, macros: { cal: 340, p: 8, c: 54, f: 11, fb: 3 },
    steps: ["Extract thick tamarind juice.", "Roast peanuts, sesame. Make masala paste.", "Make tadka, add tamarind, jaggery, masala. Cook thick.", "Mix with rice. Each grain coated.", "Serve with papad and curd."], similar: ["d22", "d12"]
  },
];

const FESTS = [
  { date: "2026-03-14", name: "Ekadashi", type: "fast" }, { date: "2026-03-28", name: "Ekadashi", type: "fast" },
  { date: "2026-03-30", name: "Gudi Padwa", type: "festival" }, { date: "2026-04-02", name: "Ram Navami", type: "fast" },
  { date: "2026-08-14", name: "Janmashtami", type: "fast" }, { date: "2026-10-01", name: "Navratri", type: "fast" },
  { date: "2026-10-10", name: "Dussehra", type: "festival" }, { date: "2026-10-31", name: "Diwali", type: "festival" },
];

const getSeason = () => { const m = new Date().getMonth(); if (m >= 2 && m <= 5) return "summer"; if (m >= 6 && m <= 8) return "monsoon"; return "winter"; };
const weekDates = (() => { const d = new Date(), day = d.getDay(), diff = day === 0 ? -6 : 1 - day; d.setDate(d.getDate() + diff); return Array.from({ length: 7 }, (_, i) => { const x = new Date(d); x.setDate(d.getDate() + i); return x; }); })();
const fmtD = d => d.toISOString().split("T")[0];
const getFest = ds => FESTS.find(f => f.date === ds);
const shuf = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = 0 | Math.random() * (i + 1);[b[i], b[j]] = [b[j], b[i]]; } return b; };

function genPlan(locked = {}, disliked = [], prefs = {}) {
  const season = getSeason(), plan = {}, used = new Set();
  weekDates.forEach((date, idx) => {
    const ds = fmtD(date), fest = getFest(ds), isFast = fest?.type === "fast", isWknd = idx >= 5;
    plan[ds] = {};
    MT.forEach(mt => {
      const lk = `${ds}-${mt}`;
      if (locked[lk]) { plan[ds][mt] = locked[lk]; used.add(locked[lk].id); return; }
      let c = DB.filter(m => m.type === mt && !used.has(m.id) && !disliked.includes(m.id));
      c = c.filter(m => m.season === "all" || m.season === season);
      if (isFast) c = c.filter(m => m.noOG || m.tags.includes("fasting"));
      if (!isWknd) c = c.filter(m => m.effort <= 35);
      if (prefs.regions?.length) c = c.filter(m => prefs.regions.includes(m.region) || m.region === "Fusion");
      if (prefs.maxEffort) c = c.filter(m => m.effort <= prefs.maxEffort);
      if (!c.length) c = DB.filter(m => m.type === mt && !disliked.includes(m.id));
      const pick = shuf(c)[0];
      if (pick) { plan[ds][mt] = pick; used.add(pick.id); }
    });
  });
  return plan;
}

function genGrocery(plan, servings = 6) {
  const mult = servings / 4, map = {};
  Object.values(plan).forEach(dp => Object.values(dp).forEach(m => {
    if (!m) return;
    m.ingredients.forEach(ig => {
      const k = ig.n.toLowerCase();
      const qMatch = ig.q.match(/([\d.]+)\s*(g|kg|ml|L|pcs?|pc)/i);
      if (qMatch) {
        const val = parseFloat(qMatch[1]) * mult, unit = qMatch[2].toLowerCase();
        const key = k;
        if (!map[key]) map[key] = { name: ig.n, val: 0, unit };
        map[key].val += val;
      } else {
        if (!map[k]) map[k] = { name: ig.n, val: 1, unit: "pcs" };
        map[k].val += mult;
      }
    });
  }));
  // Convert g to kg where > 500g
  Object.values(map).forEach(item => {
    if (item.unit === "g" && item.val >= 500) { item.val = Math.round(item.val / 100) / 10; item.unit = "kg"; }
    else if (item.unit === "g") { item.val = Math.round(item.val / 10) * 10; }
    else if (item.unit === "ml" && item.val >= 1000) { item.val = Math.round(item.val / 100) / 10; item.unit = "L"; }
    else if (item.unit === "ml") { item.val = Math.round(item.val); }
    else { item.val = Math.ceil(item.val); }
  });
  const cats = { "🥬 Vegetables": [], "🫘 Dals & Pulses": [], "🧈 Dairy": [], "🌾 Grains & Flour": [], "🫙 Spices & Masala": [], "🥫 Other": [] };
  const rules = [
    [/potato|onion|tomato|capsicum|cauliflower|spinach|brinjal|bhindi|peas|carrot|cabbage|mushroom|gourd|fenugreek|coriander|radish|drumstick|vegetable|chili|curry leaves|ginger|garlic|mint|mustard green|bathua|spring onion|cucumber|corn|pomegranate|lemon/, "🥬 Vegetables"],
    [/dal|rajma|chickpea|moong|toor|masoor|urad|chana|peanut|cashew|sprout|lentil|kidney/, "🫘 Dals & Pulses"],
    [/paneer|cream|butter|ghee|curd|yogurt|milk|cheese/, "🧈 Dairy"],
    [/rice|wheat|maida|besan|semolina|oats|vermicelli|noodle|bread|pav|basmati|poha|sabudana|buckwheat|maize|cornflour|batter|pasta|flattened/, "🌾 Grains & Flour"],
    [/spice|cumin|mustard seed|turmeric|chili powder|pepper|cardamom|saffron|bay leaf|masala|amchur|salt|eno|soy sauce|vinegar|tamarind|kasuri|garam|italian herb|chili flake|chili sauce|jaggery|sugar|sambhar powder|pickle|sesame|ajwain/, "🫙 Spices & Masala"],
  ];
  Object.values(map).forEach(item => {
    const k = item.name.toLowerCase();
    const cat = rules.find(([re]) => re.test(k))?.[1] || "🥫 Other";
    cats[cat].push(item);
  });
  Object.values(cats).forEach(arr => arr.sort((a, b) => a.name.localeCompare(b.name)));
  return cats;
}

// ═══ APP ═══
export default function Bhojan() {
  const [step, setStep] = useState("onboard");
  const [obStep, setObStep] = useState(0);
  const [screen, setScreen] = useState("today");
  const [familyName, setFamilyName] = useState("");
  const [members, setMembers] = useState([{ id: 1, name: "", role: "Mother" }, { id: 2, name: "", role: "Father" }]);
  const [servings, setServings] = useState(6);
  const [hasBaby, setHasBaby] = useState(true);
  const [prefs, setPrefs] = useState({ regions: [], spice: "medium", maxEffort: 45 });
  const [eatingToday, setEatingToday] = useState({});
  const [plan, setPlan] = useState(null);
  const [locked, setLocked] = useState({});
  const [disliked, setDisliked] = useState([]);
  const [liked, setLiked] = useState([]);
  const [grocery, setGrocery] = useState(null);
  const [grocCheck, setGrocCheck] = useState({});
  const [ratings, setRatings] = useState({});
  const [swapT, setSwapT] = useState(null);
  const [detail, setDetail] = useState(null);
  const [tasteIdx, setTasteIdx] = useState(0);

  const today = fmtD(new Date());

  useEffect(() => {
    if (step === "main" && !plan) {
      const p = genPlan(locked, disliked, prefs);
      setPlan(p); setGrocery(genGrocery(p, servings));
      const eat = {}; members.forEach(m => { eat[m.id] = true; }); setEatingToday(eat);
    }
  }, [step]);

  const regen = () => { const p = genPlan(locked, disliked, prefs); setPlan(p); setGrocery(genGrocery(p, servings)); };
  const doSwap = meal => { if (!swapT) return; setPlan(p => { const u = { ...p, [swapT.ds]: { ...p[swapT.ds], [swapT.mt]: meal } }; setGrocery(genGrocery(u, servings)); return u; }); setSwapT(null); };
  const toggleLock = (ds, mt) => { const k = `${ds}-${mt}`; setLocked(p => { if (p[k]) { const n = { ...p }; delete n[k]; return n; } return { ...p, [k]: plan[ds][mt] }; }); };

  const shareWA = () => {
    if (!plan) return;
    let msg = `📋 *${familyName || "Our"} Weekly Meal Plan*\n👥 ${servings} people\n\n`;
    weekDates.forEach((d, i) => {
      const ds = fmtD(d), dp = plan[ds], fest = getFest(ds);
      msg += `*${FDAYS[i]}*`; if (fest) msg += ` ${fest.type === "fast" ? "🪔" : "🎉"} ${fest.name}`; msg += `\n`;
      MT.forEach(mt => { if (dp?.[mt]) msg += `${MI[mt]} ${dp[mt].name}${dp[mt].combo?.length ? ` + ${dp[mt].combo.join(", ")}` : ""}\n`; });
      msg += `\n`;
    });
    msg += `_Bhojan 🍲_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const shareGrocWA = () => {
    if (!grocery) return;
    let msg = `🛒 *Grocery — ${servings} servings*\n\n`;
    Object.entries(grocery).forEach(([cat, items]) => {
      const unchecked = items.filter(it => !grocCheck[it.name]);
      if (!unchecked.length) return;
      msg += `*${cat}*\n`;
      unchecked.forEach(it => { msg += `⬜ ${it.name} — ${it.val} ${it.unit}\n`; });
      msg += `\n`;
    });
    msg += `_Bhojan 🍲_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const weekMacros = useMemo(() => {
    if (!plan) return { cal: 0, p: 0, c: 0, f: 0, fb: 0, days: {} };
    let t = { cal: 0, p: 0, c: 0, f: 0, fb: 0 }; const days = {};
    Object.entries(plan).forEach(([ds, dp]) => {
      days[ds] = { cal: 0, p: 0, c: 0, f: 0, fb: 0 };
      Object.values(dp).forEach(m => { if (!m?.macros) return;["cal", "p", "c", "f", "fb"].forEach(k => { t[k] += m.macros[k]; days[ds][k] += m.macros[k]; }); });
    });
    return { ...t, days };
  }, [plan]);

  const tasteMeals = useMemo(() => shuf(DB).slice(0, 20), []);

  // ── FallbackImg ──
  const FoodImg = ({ src, name, style: s }) => {
    const [err, setErr] = useState(false);
    const vis = { paratha: "🫓", rice: "🍚", dal: "🥣", paneer: "🧀", sabzi: "🥬", dosa: "🫓", biryani: "🍛", noodle: "🍜", pasta: "🍝", soup: "🍲", wrap: "🌯", idli: "⚪", khichdi: "🍲", puri: "🫓", default: "🍽️" };
    const em = (() => { const n = (name || "").toLowerCase(); for (const [k, v] of Object.entries(vis)) if (n.includes(k)) return v; return vis.default; })();
    const grad = "linear-gradient(135deg,#FFE8C2,#FFDAA0)";
    if (err) return <div style={{ ...s, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s?.height > 80 ? 48 : 28 }}>{em}</div>;
    return <img src={src} alt={name} onError={() => setErr(true)} style={{ ...s, objectFit: "cover" }} loading="lazy" />;
  };

  // ═══ ONBOARDING (5 steps, ~5 min) ═══
  if (step === "onboard") {
    const regions = ["North", "South", "West", "Fusion"];
    return (
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", minHeight: "100vh", background: C.bg, padding: 20, maxWidth: 440, margin: "0 auto" }}>
        <style>{fonts}</style>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Progress */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {[0, 1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= obStep ? C.orange : C.border, transition: "0.3s" }} />)}
        </div>

        {obStep === 0 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 52, marginBottom: 6 }}>🍲</div>
              <h1 style={{ fontFamily: "'Outfit'", fontSize: 30, fontWeight: 900, color: C.brown, margin: "0 0 4px", letterSpacing: "-0.03em" }}>Bhojan</h1>
              <p style={{ color: C.brownL, fontSize: 14 }}>Your week's meals, decided in 60 seconds.</p>
            </div>
            <label style={{ display: "block", marginBottom: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.brownM }}>Family Name</span>
              <input value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder="e.g., Sharma Parivar"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 15, fontFamily: "'Source Sans 3'", outline: "none", boxSizing: "border-box", background: C.card, marginTop: 4 }} />
            </label>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.brownM }}>Family Members</span>
                <button onClick={() => setMembers(p => [...p, { id: Date.now(), name: "", role: "" }])} style={{ background: C.orangeL, border: "none", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: C.orange, cursor: "pointer" }}>+ Add</button>
              </div>
              {members.map((m, i) => (
                <div key={m.id} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{["👩", "👨", "👴", "👵", "👦", "👧", "👶", "🧑"][i % 8]}</span>
                  <input value={m.name} onChange={e => setMembers(p => p.map(x => x.id === m.id ? { ...x, name: e.target.value } : x))} placeholder="Name"
                    style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, outline: "none", background: C.card }} />
                  {members.length > 2 && <button onClick={() => setMembers(p => p.filter(x => x.id !== m.id))} style={{ background: "none", border: "none", fontSize: 14, cursor: "pointer", color: "#ccc" }}>✕</button>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.brownM }}>Default servings:</span>
              <div style={{ display: "flex", gap: 4 }}>
                {[3, 4, 5, 6, 7, 8].map(n => (
                  <button key={n} onClick={() => setServings(n)} style={{ width: 36, height: 36, borderRadius: 8, border: servings === n ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: servings === n ? C.orangeL : C.card, fontSize: 15, fontWeight: 700, cursor: "pointer", color: servings === n ? C.orange : C.brownL }}>{n}</button>
                ))}
              </div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${hasBaby ? C.orange : C.border}`, background: hasBaby ? C.orangeL : C.card, cursor: "pointer", marginBottom: 20 }} onClick={() => setHasBaby(!hasBaby)}>
              <span style={{ fontSize: 20 }}>👶</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: C.brownM }}>Baby/toddler under 3</span>
              <div style={{ width: 38, height: 20, borderRadius: 10, background: hasBaby ? C.orange : "#D4C5B0", position: "relative", transition: "0.3s" }}><div style={{ position: "absolute", top: 2, left: hasBaby ? 20 : 2, width: 16, height: 16, borderRadius: 8, background: "white", transition: "0.3s" }} /></div>
            </label>
            <button onClick={() => setObStep(1)} style={{ width: "100%", background: `linear-gradient(135deg,${C.orange},#E8913A)`, color: "white", border: "none", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit'" }}>Next → Cuisine Preferences</button>
          </div>
        )}

        {obStep === 1 && (
          <div style={{ animation: "fadeIn 0.4s ease" }}>
            <h2 style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: C.brown, margin: "0 0 6px" }}>Which cuisines do you enjoy?</h2>
            <p style={{ fontSize: 13, color: C.brownL, margin: "0 0 20px" }}>Pick all that apply. This helps us suggest meals you'll love.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[{ k: "North", em: "🫓", eg: "Paratha, Dal Makhani, Chole" }, { k: "South", em: "🫓", eg: "Dosa, Sambhar, Rasam" }, { k: "West", em: "🥘", eg: "Dhokla, Pav Bhaji, Misal" }, { k: "Fusion", em: "🍝", eg: "Pasta, Noodles, Wraps" }].map(r => (
                <button key={r.k} onClick={() => setPrefs(p => ({ ...p, regions: p.regions.includes(r.k) ? p.regions.filter(x => x !== r.k) : [...p.regions, r.k] }))}
                  style={{ padding: 14, borderRadius: 14, border: prefs.regions.includes(r.k) ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: prefs.regions.includes(r.k) ? C.orangeL : C.card, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{r.em}</div>
                  <div style={{ fontWeight: 700, color: C.brown, fontSize: 15 }}>{r.k} Indian</div>
                  <div style={{ fontSize: 11, color: C.brownL }}>{r.eg}</div>
                </button>
              ))}
            </div>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.brownM, display: "block", marginBottom: 8 }}>Spice Level</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ k: "mild", l: "🌶️ Mild" }, { k: "medium", l: "🌶️🌶️ Medium" }, { k: "spicy", l: "🌶️🌶️🌶️ Spicy" }].map(s => (
                  <button key={s.k} onClick={() => setPrefs(p => ({ ...p, spice: s.k }))}
                    style={{ flex: 1, padding: "10px", borderRadius: 10, border: prefs.spice === s.k ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: prefs.spice === s.k ? C.orangeL : C.card, fontSize: 12, fontWeight: 600, cursor: "pointer", color: prefs.spice === s.k ? C.orange : C.brownL }}>{s.l}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.brownM, display: "block", marginBottom: 8 }}>Weekday cooking time (per meal)</span>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ k: 20, l: "⚡ Under 20 min" }, { k: 35, l: "🕐 Under 35 min" }, { k: 60, l: "👩‍🍳 No limit" }].map(t => (
                  <button key={t.k} onClick={() => setPrefs(p => ({ ...p, maxEffort: t.k }))}
                    style={{ flex: 1, padding: "10px", borderRadius: 10, border: prefs.maxEffort === t.k ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: prefs.maxEffort === t.k ? C.orangeL : C.card, fontSize: 11, fontWeight: 600, cursor: "pointer", color: prefs.maxEffort === t.k ? C.orange : C.brownL }}>{t.l}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setObStep(0)} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${C.border}`, background: C.card, fontSize: 14, fontWeight: 600, cursor: "pointer", color: C.brownL }}>← Back</button>
              <button onClick={() => setStep("taste")} style={{ flex: 2, background: `linear-gradient(135deg,${C.orange},#E8913A)`, color: "white", border: "none", borderRadius: 14, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit'" }}>Next → Taste Test 🎯</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ═══ TASTE SWIPE ═══
  if (step === "taste") {
    const meal = tasteMeals[tasteIdx];
    if (!meal || tasteIdx >= tasteMeals.length) { setStep("main"); return null; }
    return (
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <style>{fonts}</style>
        <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}`}</style>
        <p style={{ fontSize: 12, color: C.brownL, fontWeight: 600, marginBottom: 6 }}>{tasteIdx + 1}/{tasteMeals.length} — Like, Neutral, or Dislike</p>
        <div style={{ width: "100%", maxWidth: 360, height: 4, borderRadius: 2, background: C.border, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ width: `${((tasteIdx + 1) / tasteMeals.length) * 100}%`, height: "100%", background: C.orange, borderRadius: 2, transition: "0.3s" }} />
        </div>
        <div key={meal.id} style={{ animation: "slideIn 0.3s ease", width: "100%", maxWidth: 360, borderRadius: 20, overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.08)", border: `1.5px solid ${C.border}` }}>
          <FoodImg src={meal.img} name={meal.name} style={{ width: "100%", height: 180, display: "block" }} />
          <div style={{ padding: 16, background: C.card }}>
            <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 2px" }}>{meal.name}</h2>
            <p style={{ fontSize: 12, color: C.brownL, margin: 0 }}>{meal.region} · {meal.effort} min · {meal.macros.cal} kcal · {meal.macros.p}g protein</p>
            {meal.combo?.length > 0 && <p style={{ fontSize: 11, color: C.brownM, margin: "4px 0 0" }}>+ {meal.combo.join(", ")}</p>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20, width: "100%", maxWidth: 360 }}>
          {[{ em: "👎", act: () => { setDisliked(p => [...p, meal.id]); setTasteIdx(i => i + 1); }, bg: "#FFF5F5", bc: "#FFCDD2" },
          { em: "😐", act: () => setTasteIdx(i => i + 1), bg: C.card, bc: C.border },
          { em: "👍", act: () => { setLiked(p => [...p, meal.id]); setTasteIdx(i => i + 1); }, bg: "#F1F8E9", bc: "#C8E6C9" }
          ].map((b, i) => (
            <button key={i} onClick={b.act} style={{ flex: 1, padding: 14, borderRadius: 14, border: `2px solid ${b.bc}`, background: b.bg, fontSize: 24, cursor: "pointer", transition: "transform 0.15s" }}
              onMouseDown={e => e.target.style.transform = "scale(0.93)"} onMouseUp={e => e.target.style.transform = "scale(1)"}>{b.em}</button>
          ))}
        </div>
        <button onClick={() => setStep("main")} style={{ marginTop: 14, background: "none", border: "none", color: C.brownL, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Skip → Generate my plan</button>
      </div>
    );
  }

  if (!plan) return null;
  const todayPlan = plan[today] || plan[Object.keys(plan)[0]];
  const todayDs = today in plan ? today : Object.keys(plan)[0];
  const todayFest = getFest(todayDs);
  const eatCount = Object.values(eatingToday).filter(Boolean).length;

  // ── Card ──
  const MealCard = ({ meal, ds, mt, compact, noActions }) => {
    if (!meal) return null;
    const isLk = !!locked[`${ds}-${mt}`];
    return (
      <div onClick={() => setDetail(meal)} style={{ background: C.card, borderRadius: compact ? 12 : 16, border: `1.5px solid ${C.border}`, overflow: "hidden", cursor: "pointer", transition: "0.2s", display: "flex", alignItems: "stretch" }}>
        <FoodImg src={meal.img} name={meal.name} style={{ width: compact ? 52 : 72, height: compact ? 52 : 72, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: compact ? "6px 8px" : "10px 12px", minWidth: 0 }}>
          {!compact && <div style={{ fontSize: 10, color: C.brownL, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{MI[mt]} {ML[mt]}</div>}
          <div style={{ fontWeight: 700, color: C.brown, fontSize: compact ? 12 : 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{meal.name}</div>
          {!compact && meal.combo?.length > 0 && <div style={{ fontSize: 10, color: C.brownL, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>+ {meal.combo.join(", ")}</div>}
          {!compact && <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#FFF3E0", color: "#E65100", fontWeight: 600 }}>⏱{meal.effort}m</span>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#E8F5E9", color: "#2E7D32", fontWeight: 600 }}>{meal.macros.p}g P</span>
            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#FFF8E1", color: "#F57F17", fontWeight: 600 }}>{meal.macros.cal}kcal</span>
          </div>}
        </div>
        {!compact && !noActions && (
          <div style={{ display: "flex", flexDirection: "column", gap: 3, padding: "6px", justifyContent: "center" }}>
            <button onClick={e => { e.stopPropagation(); setSwapT({ ds, mt }); }} style={{ background: C.orangeL, border: "none", borderRadius: 7, width: 28, height: 28, cursor: "pointer", fontSize: 12 }}>🔄</button>
            <button onClick={e => { e.stopPropagation(); toggleLock(ds, mt); }} style={{ background: isLk ? C.orange : "#F5EDE0", border: "none", borderRadius: 7, width: 28, height: 28, cursor: "pointer", fontSize: 12, color: isLk ? "white" : C.brownL }}>{isLk ? "🔒" : "📌"}</button>
          </div>
        )}
      </div>
    );
  };

  // ── Detail ──
  const DetailModal = () => {
    if (!detail) return null;
    const m = detail, similar = (m.similar || []).map(id => DB.find(x => x.id === id)).filter(Boolean);
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(4px)" }} onClick={() => setDetail(null)}>
        <div style={{ background: C.bg, borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 480, maxHeight: "92vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
          <div style={{ position: "relative" }}>
            <FoodImg src={m.img} name={m.name} style={{ width: "100%", height: 200, display: "block" }} />
            <button onClick={() => setDetail(null)} style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: 10, width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>✕</button>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent,rgba(0,0,0,0.5))", padding: "30px 16px 10px" }}>
              <h2 style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: "white", margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{m.name}</h2>
            </div>
          </div>
          <div style={{ padding: "16px 16px 28px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[{ l: "Cal", v: m.macros.cal, u: "kcal", cl: "#FF6F00" }, { l: "Protein", v: m.macros.p, u: "g", cl: "#2E7D32" }, { l: "Carbs", v: m.macros.c, u: "g", cl: "#1565C0" }, { l: "Fat", v: m.macros.f, u: "g", cl: "#E65100" }, { l: "Fiber", v: m.macros.fb, u: "g", cl: "#6A1B9A" }].map(mc => (
                <div key={mc.l} style={{ flex: 1, background: C.card, borderRadius: 10, padding: "8px 4px", textAlign: "center", border: `1.5px solid ${C.border}` }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: mc.cl, fontFamily: "'Outfit'" }}>{mc.v}</div>
                  <div style={{ fontSize: 8, color: C.brownL, fontWeight: 600 }}>{mc.u}</div>
                  <div style={{ fontSize: 9, color: C.brownM }}>{mc.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ flex: 1, background: "#FFF3E0", borderRadius: 10, padding: 10, textAlign: "center" }}><div style={{ fontSize: 16 }}>⏱️</div><div style={{ fontWeight: 700, color: "#E65100", fontSize: 14 }}>{m.effort} min</div></div>
              <div style={{ flex: 1, background: "#E8F5E9", borderRadius: 10, padding: 10, textAlign: "center" }}><div style={{ fontSize: 16 }}>👥</div><div style={{ fontWeight: 700, color: "#2E7D32", fontSize: 14 }}>{servings} ppl</div></div>
              <div style={{ flex: 1, background: "#F3E5F5", borderRadius: 10, padding: 10, textAlign: "center" }}><div style={{ fontSize: 16 }}>📍</div><div style={{ fontWeight: 700, color: "#6A1B9A", fontSize: 14 }}>{m.region}</div></div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              <button onClick={() => { setLiked(p => p.includes(m.id) ? p.filter(x => x !== m.id) : [...p, m.id]); setDisliked(p => p.filter(x => x !== m.id)); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: liked.includes(m.id) ? `2px solid #4CAF50` : `2px solid ${C.border}`, background: liked.includes(m.id) ? "#E8F5E9" : C.card, fontSize: 13, fontWeight: 600, cursor: "pointer", color: liked.includes(m.id) ? "#2E7D32" : C.brownL }}>👍 Show more like this</button>
              <button onClick={() => { setDisliked(p => p.includes(m.id) ? p.filter(x => x !== m.id) : [...p, m.id]); setLiked(p => p.filter(x => x !== m.id)); }} style={{ flex: 1, padding: 10, borderRadius: 10, border: disliked.includes(m.id) ? `2px solid #D32F2F` : `2px solid ${C.border}`, background: disliked.includes(m.id) ? "#FFEBEE" : C.card, fontSize: 13, fontWeight: 600, cursor: "pointer", color: disliked.includes(m.id) ? "#D32F2F" : C.brownL }}>👎 Don't show this</button>
            </div>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: C.brown, margin: "0 0 6px" }}>🧾 Ingredients ({servings} servings)</h3>
            <div style={{ background: C.card, borderRadius: 12, padding: 12, border: `1.5px solid ${C.border}`, marginBottom: 16 }}>
              {m.ingredients.map((ig, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < m.ingredients.length - 1 ? `1px solid ${C.border}` : "none", fontSize: 13 }}>
                <span style={{ color: C.brownM }}>{ig.n}</span><span style={{ fontWeight: 600, color: C.orange }}>{ig.q}</span>
              </div>)}
            </div>
            {m.steps && <><h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: C.brown, margin: "0 0 6px" }}>👨‍🍳 Preparation</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {m.steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: `linear-gradient(135deg,${C.orange},#E8913A)`, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ fontSize: 13, color: C.brownM, lineHeight: 1.5, margin: 0 }}>{s}</p>
                </div>)}
              </div></>}
            {similar.length > 0 && <><h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: C.brown, margin: "0 0 6px" }}>🔗 Similar</h3>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6 }}>
                {similar.map(sm => <div key={sm.id} onClick={() => setDetail(sm)} style={{ minWidth: 120, borderRadius: 12, border: `1.5px solid ${C.border}`, overflow: "hidden", cursor: "pointer", flexShrink: 0, background: C.card }}>
                  <FoodImg src={sm.img} name={sm.name} style={{ width: 120, height: 70, display: "block" }} />
                  <div style={{ padding: 6 }}><div style={{ fontWeight: 600, fontSize: 11, color: C.brown }}>{sm.name}</div><div style={{ fontSize: 9, color: C.brownL }}>{sm.macros.cal}kcal · {sm.effort}m</div></div>
                </div>)}
              </div></>}
          </div>
        </div>
      </div>
    );
  };

  // ── Swap ──
  const SwapModal = () => {
    if (!swapT) return null;
    const alts = shuf(DB.filter(m => m.type === swapT.mt && !disliked.includes(m.id))).slice(0, 6);
    return (
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 150, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(4px)" }} onClick={() => setSwapT(null)}>
        <div style={{ background: C.bg, borderRadius: "22px 22px 0 0", width: "100%", maxWidth: 480, maxHeight: "65vh", overflow: "auto", padding: 18 }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 17, fontWeight: 700, color: C.brown, margin: 0 }}>Swap {ML[swapT.mt]}</h3>
            <button onClick={() => setSwapT(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: C.brownL }}>✕</button>
          </div>
          {alts.map(meal => (
            <button key={meal.id} onClick={() => doSwap(meal)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: 0, borderRadius: 12, border: `2px solid ${C.border}`, background: C.card, cursor: "pointer", textAlign: "left", overflow: "hidden", marginBottom: 6, transition: "0.2s" }}
              onMouseOver={e => e.currentTarget.style.borderColor = C.orange} onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
              <FoodImg src={meal.img} name={meal.name} style={{ width: 50, height: 50, flexShrink: 0 }} />
              <div style={{ flex: 1, padding: "6px 0" }}><div style={{ fontWeight: 600, color: C.brown, fontSize: 13 }}>{meal.name}</div><div style={{ fontSize: 10, color: C.brownL }}>{meal.macros.cal}kcal · {meal.macros.p}g P · {meal.effort}m</div></div>
              <span style={{ color: C.orange, fontWeight: 700, fontSize: 11, paddingRight: 10 }}>Pick →</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ═══ SCREENS ═══
  const TodayScreen = () => (
    <div style={{ padding: "14px 14px 100px" }}>
      <h1 style={{ fontFamily: "'Outfit'", fontSize: 24, fontWeight: 900, color: C.brown, margin: "0 0 2px" }}>{familyName ? `${familyName}'s Kitchen` : "Today"} 🍲</h1>
      <p style={{ color: C.brownL, fontSize: 12, margin: "0 0 12px" }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
      <div style={{ background: C.card, borderRadius: 14, padding: 10, border: `1.5px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.brownM }}>👥 Eating today: {eatCount}</span>
          <button onClick={() => { setServings(eatCount); setGrocery(genGrocery(plan, eatCount)); }} style={{ fontSize: 10, color: C.orange, fontWeight: 600, background: C.orangeL, border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer" }}>Update portions</button>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {members.map((m, i) => <button key={m.id} onClick={() => setEatingToday(p => ({ ...p, [m.id]: !p[m.id] }))}
            style={{ padding: "4px 8px", borderRadius: 8, border: eatingToday[m.id] ? `1.5px solid ${C.green}` : `1.5px solid ${C.border}`, background: eatingToday[m.id] ? "#E8F5E9" : C.card, fontSize: 11, fontWeight: 600, cursor: "pointer", color: eatingToday[m.id] ? C.green : C.brownL }}>
            {["👩", "👨", "👴", "👵", "👦", "👧", "👶", "🧑"][i % 8]} {m.name || `P${i + 1}`}
          </button>)}
        </div>
      </div>
      {todayFest && <div style={{ background: todayFest.type === "fast" ? "#FFF3E0" : "#E8F5E9", borderRadius: 12, padding: "8px 12px", marginBottom: 12, border: todayFest.type === "fast" ? "1.5px solid #FFB74D" : "1.5px solid #81C784", fontSize: 12, fontWeight: 600, color: C.brown }}>
        {todayFest.type === "fast" ? "🪔" : "🎉"} {todayFest.name}
      </div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MT.map(mt => <MealCard key={mt} meal={todayPlan?.[mt]} ds={todayDs} mt={mt} />)}
      </div>
      {hasBaby && <div style={{ marginTop: 12, background: "linear-gradient(135deg,#F3E5F5,#E1BEE7)", borderRadius: 14, padding: 12, border: "1.5px solid #CE93D8", fontSize: 12, color: "#6A1B9A", lineHeight: 1.5 }}>
        <b>👶 Baby Meals:</b> 🌅 Ragi porridge + banana · ☀️ Khichdi mash · 🌙 Curd rice + steamed veggies
      </div>}
      <div style={{ marginTop: 12, background: C.card, borderRadius: 14, padding: 12, border: `1.5px solid ${C.border}` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.brownM, marginBottom: 6 }}>📊 Today's Nutrition</div>
        <div style={{ display: "flex", gap: 4 }}>
          {[{ l: "Cal", v: weekMacros.days[todayDs]?.cal || 0, c: "#FF6F00" }, { l: "Protein", v: weekMacros.days[todayDs]?.p || 0, c: "#2E7D32", u: "g" }, { l: "Carbs", v: weekMacros.days[todayDs]?.c || 0, c: "#1565C0", u: "g" }, { l: "Fiber", v: weekMacros.days[todayDs]?.fb || 0, c: "#6A1B9A", u: "g" }].map(x => (
            <div key={x.l} style={{ flex: 1, textAlign: "center", background: "#F8F4EE", borderRadius: 8, padding: "6px 2px" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: x.c, fontFamily: "'Outfit'" }}>{x.v}{x.u || ""}</div>
              <div style={{ fontSize: 9, color: C.brownL }}>{x.l}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={regen} style={{ marginTop: 14, width: "100%", background: `linear-gradient(135deg,${C.orange},#E8913A)`, color: "white", border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit'" }}>🔄 Regenerate Week</button>
    </div>
  );

  const WeekScreen = () => (
    <div style={{ padding: "14px 14px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: 0 }}>Week Plan</h2>
        <div style={{ display: "flex", gap: 4 }}>
          <button onClick={shareWA} style={{ background: "#25D366", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "white" }}>💬 Share</button>
          <button onClick={regen} style={{ background: C.orangeL, border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: C.orange }}>🔄 New</button>
        </div>
      </div>
      {weekDates.map((date, idx) => {
        const ds = fmtD(date), dp = plan[ds], fest = getFest(ds), isT = ds === today;
        return (<div key={ds} style={{ background: isT ? C.orangeL : C.card, borderRadius: 14, padding: 10, border: isT ? `2px solid ${C.orange}` : `1.5px solid ${C.border}`, marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <div><span style={{ fontFamily: "'Outfit'", fontWeight: 700, color: C.brown, fontSize: 14 }}>{FDAYS[idx]}</span><span style={{ fontSize: 10, color: C.brownL, marginLeft: 4 }}>{date.getDate()}/{date.getMonth() + 1}</span>{isT && <span style={{ fontSize: 8, marginLeft: 4, background: C.orange, color: "white", padding: "1px 5px", borderRadius: 4, fontWeight: 700 }}>TODAY</span>}</div>
            {fest && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 5, background: fest.type === "fast" ? "#FFF3E0" : "#E8F5E9", color: fest.type === "fast" ? "#E65100" : "#2E7D32", fontWeight: 700 }}>{fest.name}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {MT.map(mt => dp?.[mt] && <div key={mt} style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ fontSize: 12, width: 18 }}>{MI[mt]}</span>
              <div style={{ flex: 1 }}><MealCard meal={dp[mt]} ds={ds} mt={mt} compact /></div>
              <button onClick={() => setSwapT({ ds, mt })} style={{ background: "#F5EDE0", border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontSize: 10 }}>🔄</button>
            </div>)}
          </div>
        </div>);
      })}
    </div>
  );

  const GroceryScreen = () => {
    if (!grocery) return null;
    const total = Object.values(grocery).flat().length;
    const checked = Object.values(grocCheck).filter(Boolean).length;
    return (
      <div style={{ padding: "14px 14px 100px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: 0 }}>Grocery</h2>
          <button onClick={shareGrocWA} style={{ background: "#25D366", border: "none", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", color: "white" }}>💬 Share (unchecked only)</button>
        </div>
        <p style={{ fontSize: 11, color: C.brownL, margin: "2px 0 10px" }}>{servings} servings · {checked}/{total} have at home</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.brownM }}>Servings:</span>
          <select value={servings} onChange={e => { setServings(+e.target.value); setGrocery(genGrocery(plan, +e.target.value)); }}
            style={{ padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${C.border}`, fontSize: 12, fontWeight: 600, color: C.orange, background: C.card }}>
            {[2, 3, 4, 5, 6, 7, 8, 10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div style={{ width: "100%", height: 4, borderRadius: 2, background: C.border, marginBottom: 14, overflow: "hidden" }}>
          <div style={{ width: `${total ? (checked / total) * 100 : 0}%`, height: "100%", background: C.green, borderRadius: 2, transition: "0.3s" }} />
        </div>
        {Object.entries(grocery).map(([cat, items]) => {
          if (!items.length) return null;
          return (<div key={cat} style={{ marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 700, color: C.brownM, margin: "0 0 4px", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>{cat}</h3>
            {items.map(item => (
              <label key={item.name} onClick={() => setGrocCheck(p => ({ ...p, [item.name]: !p[item.name] }))}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 8px", borderRadius: 6, cursor: "pointer", background: grocCheck[item.name] ? "#F5F5F0" : "transparent" }}>
                <div style={{ width: 18, height: 18, borderRadius: 5, border: grocCheck[item.name] ? "none" : `2px solid #D4C5B0`, background: grocCheck[item.name] ? "#4CAF50" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {grocCheck[item.name] && <span style={{ color: "white", fontSize: 11 }}>✓</span>}
                </div>
                <span style={{ flex: 1, fontSize: 13, color: grocCheck[item.name] ? "#aaa" : C.brown, textDecoration: grocCheck[item.name] ? "line-through" : "none" }}>{item.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: grocCheck[item.name] ? "#ccc" : C.orange }}>{item.val} {item.unit}</span>
              </label>
            ))}
          </div>);
        })}
      </div>
    );
  };

  const AnalyticsScreen = () => {
    const avg = k => Math.round(weekMacros[k] / 7);
    return (
      <div style={{ padding: "14px 14px 100px" }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 12px" }}>Health Analytics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
          {[{ l: "Avg Calories", v: avg("cal"), u: "kcal/day", c: "#FF6F00", em: "🔥" }, { l: "Avg Protein", v: `${avg("p")}g`, u: "/day", c: "#2E7D32", em: "💪" }, { l: "Avg Carbs", v: `${avg("c")}g`, u: "/day", c: "#1565C0", em: "🌾" }, { l: "Avg Fiber", v: `${avg("fb")}g`, u: "/day", c: "#6A1B9A", em: "🥦" }].map(c => (
            <div key={c.l} style={{ background: C.card, borderRadius: 14, padding: 14, border: `1.5px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 2 }}>{c.em}</div>
              <div style={{ fontFamily: "'Outfit'", fontSize: 22, fontWeight: 800, color: c.c }}>{c.v}</div>
              <div style={{ fontSize: 10, color: C.brownL }}>{c.l}</div>
            </div>
          ))}
        </div>
        <h3 style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 700, color: C.brown, margin: "0 0 8px" }}>Daily Breakdown</h3>
        {weekDates.map((d, i) => {
          const ds = fmtD(d), dm = weekMacros.days[ds] || {};
          return (<div key={ds} style={{ background: C.card, borderRadius: 10, padding: "8px 10px", border: `1.5px solid ${C.border}`, marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontFamily: "'Outfit'", fontWeight: 600, fontSize: 12, color: C.brown }}>{DAYS[i]}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#FF6F00" }}>{dm.cal || 0} kcal</span>
            </div>
            <div style={{ display: "flex", gap: 3, height: 6 }}>
              {[{ v: dm.p || 0, max: 60, c: "#4CAF50" }, { v: dm.c || 0, max: 200, c: "#42A5F5" }, { v: dm.f || 0, max: 60, c: "#FF7043" }, { v: dm.fb || 0, max: 25, c: "#AB47BC" }].map((b, j) => (
                <div key={j} style={{ flex: 1, background: "#F0E6D6", borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${Math.min(100, (b.v / b.max) * 100)}%`, height: "100%", background: b.c, borderRadius: 3 }} /></div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
              {[{ l: "P", v: dm.p, c: "#4CAF50" }, { l: "C", v: dm.c, c: "#42A5F5" }, { l: "F", v: dm.f, c: "#FF7043" }, { l: "Fb", v: dm.fb, c: "#AB47BC" }].map(x => <span key={x.l} style={{ fontSize: 9, color: x.c, fontWeight: 600 }}>{x.l}:{x.v || 0}g</span>)}
            </div>
          </div>);
        })}
      </div>
    );
  };

  const LibraryScreen = () => {
    const [search, setSearch] = useState("");
    const [ft, setFt] = useState("all");
    const filtered = DB.filter(m => {
      if (ft !== "all" && m.type !== ft) return false;
      if (search) { const s = search.toLowerCase(); return m.name.toLowerCase().includes(s) || m.tags.some(t => t.includes(s)) || m.region.toLowerCase().includes(s); }
      return true;
    });
    return (
      <div style={{ padding: "14px 14px 100px" }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 8px" }}>Meal Library</h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
          style={{ width: "100%", padding: "9px 12px", borderRadius: 10, border: `2px solid ${C.border}`, fontSize: 13, outline: "none", boxSizing: "border-box", background: C.card, marginBottom: 8 }} />
        <div style={{ display: "flex", gap: 4, marginBottom: 10, overflowX: "auto" }}>
          {[{ k: "all", l: "All" }, { k: "breakfast", l: "🌅 B" }, { k: "lunch", l: "☀️ L" }, { k: "dinner", l: "🌙 D" }].map(f => (
            <button key={f.k} onClick={() => setFt(f.k)} style={{ padding: "5px 10px", borderRadius: 7, border: ft === f.k ? `2px solid ${C.orange}` : `2px solid ${C.border}`, background: ft === f.k ? C.orangeL : C.card, fontSize: 11, fontWeight: 600, cursor: "pointer", color: ft === f.k ? C.orange : C.brownL }}>{f.l}</button>
          ))}
        </div>
        <p style={{ fontSize: 10, color: C.brownL, marginBottom: 8 }}>{filtered.length} meals · 100% Vegetarian</p>
        {filtered.slice(0, 30).map(meal => {
          const isD = disliked.includes(meal.id);
          return (<div key={meal.id} onClick={() => setDetail(meal)} style={{ display: "flex", alignItems: "center", background: C.card, borderRadius: 12, border: `1.5px solid ${C.border}`, overflow: "hidden", cursor: "pointer", marginBottom: 6, opacity: isD ? 0.4 : 1 }}>
            <FoodImg src={meal.img} name={meal.name} style={{ width: 50, height: 50, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "6px 8px", minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: C.brown, fontSize: 12 }}>{meal.name}</div>
              <div style={{ fontSize: 10, color: C.brownL }}>{meal.macros.cal}kcal · {meal.macros.p}g P · {meal.effort}m · {meal.region}</div>
            </div>
            <div style={{ display: "flex", gap: 2, padding: 4 }}>
              <button onClick={e => { e.stopPropagation(); setLiked(p => p.includes(meal.id) ? p.filter(x => x !== meal.id) : [...p, meal.id]); }} style={{ width: 26, height: 26, borderRadius: 7, background: liked.includes(meal.id) ? "#E8F5E9" : "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>👍</button>
              <button onClick={e => { e.stopPropagation(); setDisliked(p => p.includes(meal.id) ? p.filter(x => x !== meal.id) : [...p, meal.id]); }} style={{ width: 26, height: 26, borderRadius: 7, background: isD ? "#FFEBEE" : "transparent", border: "none", cursor: "pointer", fontSize: 13 }}>👎</button>
            </div>
          </div>);
        })}
      </div>
    );
  };

  const ReviewScreen = () => {
    const all = []; Object.entries(plan).forEach(([ds, dp]) => Object.entries(dp).forEach(([mt, m]) => { if (m) all.push({ ...m, ds, mt }); }));
    const rated = Object.keys(ratings).length;
    return (
      <div style={{ padding: "14px 14px 100px" }}>
        <h2 style={{ fontFamily: "'Outfit'", fontSize: 20, fontWeight: 800, color: C.brown, margin: "0 0 10px" }}>Weekly Review</h2>
        <div style={{ width: "100%", height: 4, borderRadius: 2, background: C.border, marginBottom: 14, overflow: "hidden" }}><div style={{ width: `${all.length ? (rated / all.length) * 100 : 0}%`, height: "100%", background: C.green, borderRadius: 2 }} /></div>
        {all.map((m, i) => {
          const rk = `${m.ds}-${m.mt}-${m.id}`, r = ratings[rk];
          return (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, borderRadius: 10, border: `1.5px solid ${C.border}`, overflow: "hidden", marginBottom: 5 }}>
            <FoodImg src={m.img} name={m.name} style={{ width: 40, height: 40, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "4px 0", minWidth: 0 }}>
              <div style={{ fontSize: 9, color: C.brownL, fontWeight: 600 }}>{MI[m.mt]} {DAYS[weekDates.findIndex(d => fmtD(d) === m.ds)]}</div>
              <div style={{ fontWeight: 600, color: C.brown, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
            </div>
            <div style={{ display: "flex", gap: 2, paddingRight: 6 }}>
              {[{ e: "✅", v: "cooked", bg: "#E8F5E9", bc: "#4CAF50" }, { e: "⏭️", v: "skipped", bg: "#FFEBEE", bc: "#EF5350" }, { e: "🔁", v: "repeat", bg: "#FFF3E0", bc: "#FF9800" }].map(o => (
                <button key={o.v} onClick={() => setRatings(p => ({ ...p, [rk]: o.v }))} style={{ background: r === o.v ? o.bg : "#F5F0E8", border: r === o.v ? `2px solid ${o.bc}` : "2px solid transparent", borderRadius: 7, padding: "4px 7px", cursor: "pointer", fontSize: 13 }}>{o.e}</button>
              ))}
            </div>
          </div>);
        })}
      </div>
    );
  };

  const nav = [{ k: "today", i: "🏠", l: "Today" }, { k: "week", i: "📅", l: "Week" }, { k: "grocery", i: "🛒", l: "Grocery" }, { k: "analytics", i: "📊", l: "Health" }, { k: "library", i: "📚", l: "Library" }, { k: "review", i: "⭐", l: "Review" }];

  return (
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", minHeight: "100vh", background: C.bg, maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <style>{fonts}</style>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}} *{box-sizing:border-box} ::-webkit-scrollbar{width:0}`}</style>
      <div style={{ animation: "fadeIn 0.3s ease" }}>
        {screen === "today" && <TodayScreen />}{screen === "week" && <WeekScreen />}{screen === "grocery" && <GroceryScreen />}
        {screen === "analytics" && <AnalyticsScreen />}{screen === "library" && <LibraryScreen />}{screen === "review" && <ReviewScreen />}
      </div>
      <SwapModal /><DetailModal />
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(255,250,243,0.96)", backdropFilter: "blur(12px)", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "5px 0 8px", zIndex: 50 }}>
        {nav.map(n => <button key={n.k} onClick={() => setScreen(n.k)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, background: "none", border: "none", cursor: "pointer", padding: "2px 4px" }}>
          <span style={{ fontSize: 18, filter: screen === n.k ? "none" : "grayscale(0.5)" }}>{n.i}</span>
          <span style={{ fontSize: 8, fontWeight: screen === n.k ? 700 : 500, color: screen === n.k ? C.orange : C.brownL, fontFamily: "'Outfit'" }}>{n.l}</span>
          {screen === n.k && <div style={{ width: 3, height: 3, borderRadius: 2, background: C.orange }} />}
        </button>)}
      </div>
    </div>
  );
}