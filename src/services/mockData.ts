
// Mock Data Service to replace Firebase
// This uses localStorage to persist data for the demo

const MOCK_DELAY = 500;

const getStorageItem = (key: string, defaultValue: any) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initial Data
const INITIAL_SERVICES = [
  { id: '1', name: 'General Consultation', description: 'Comprehensive health checkup and medical advice.', price: 500, icon: 'Stethoscope' },
  { id: '2', name: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents.', price: 600, icon: 'Baby' },
  { id: '3', name: 'Cardiology', description: 'Heart health monitoring and diagnostic services.', price: 1200, icon: 'HeartPulse' },
  { id: '4', name: 'Orthopedics', description: 'Treatment for bone, joint, and muscle conditions.', price: 1000, icon: 'Activity' },
  { id: '5', name: 'Dermatology', description: 'Expert care for skin, hair, and nail conditions.', price: 800, icon: 'User' },
  { id: '6', name: 'Laboratory Services', description: 'Advanced diagnostic testing and blood work.', price: 400, icon: 'FlaskConical' }
];

const INITIAL_BLOG_POSTS = [
  { 
    id: '1', 
    title: 'Why X-Ray Tests Are Important for Accurate Diagnosis', 
    excerpt: 'A comprehensive guide on the importance of X-Ray tests in modern diagnostics and why Apollo Clinic in Mandi House is the best choice for an X Ray Test in New Delhi.',
    content: `## Introduction

In the world of modern medicine, the ability to see inside the human body without invasive surgery is nothing short of a miracle. Among the various imaging techniques available, the X-ray remains the most fundamental and widely used tool. For patients seeking an **X Ray Test in New Delhi**, understanding why this test is so critical can help alleviate concerns and emphasize the importance of choosing a high-quality **diagnostic center Delhi**.

## What is an X Ray Test?

An X-ray is a quick, painless medical imaging test that produces images of the structures inside your body—particularly your bones. X-ray beams pass through your body, and they are absorbed in different amounts depending on the density of the material they pass through. Dense materials, such as bone and metal, show up as white on X-rays. The air in your lungs shows up as black. Fat and muscle appear as shades of gray.

## How X Rays Work

X-rays are a form of electromagnetic radiation, similar to visible light but with higher energy. When you go for a **medical imaging test**, the X-ray machine sends a small amount of radiation through the part of the body being examined. A detector on the other side captures the rays that pass through, creating a "shadow" image of your internal structures.

## Common Conditions Diagnosed with X Ray

X-rays are versatile and used to diagnose a wide range of conditions:
- **Fractures and Infections:** In most cases, fractures in bones and teeth show up clearly on X-rays.
- **Arthritis:** X-rays of your joints can reveal evidence of arthritis.
- **Lung Infections or Conditions:** Evidence of pneumonia, tuberculosis, or lung cancer can show up on chest X-rays.
- **Digestive Tract Problems:** Using a contrast medium like barium can help highlight problems in your digestive system.

## When Doctors Recommend X Ray

Your doctor might recommend an **x ray near me** if they suspect:
- Bone cancer
- Enlarged heart
- Blocked blood vessels
- Conditions affecting your lungs
- Digestive problems
- Swallowed items

## Benefits of Digital X Ray Technology

At Apollo Clinic, we utilize **digital x ray** technology. Unlike traditional film X-rays, digital versions offer:
1. **Lower Radiation:** Digital sensors are more sensitive, requiring less radiation to produce a clear image.
2. **Instant Results:** Images are available almost immediately for review.
3. **Enhanced Detail:** Doctors can zoom in and adjust contrast for better diagnostic accuracy.
4. **Environmentally Friendly:** No chemical processing is required.

## Safety of X Ray Imaging

Many patients worry about radiation exposure. However, the amount of radiation you're exposed to during an X-ray is very small. For most adults, the benefits of accurate diagnosis far outweigh the minimal risks. At a professional **diagnostic center Delhi**, we follow strict safety protocols to ensure exposure is kept to an absolute minimum.

## Preparing for an X Ray Test

Preparation is usually minimal:
- **Clothing:** Wear loose, comfortable clothing. You may be asked to change into a gown.
- **Jewelry:** Remove any metal objects, as they can interfere with the image.
- **Pregnancy:** Always inform your technician if you are or might be pregnant.

## Why Choose a Reliable Diagnostic Center?

Choosing the right place for your **X Ray Test in New Delhi** is crucial. A reliable center like Apollo Clinic in Mandi House offers:
- Expert Radiologists
- State-of-the-art Digital Equipment
- Hygienic Environment
- Accurate and Fast Reporting

## Conclusion

X-rays are an indispensable part of modern healthcare. They provide the clarity needed for doctors to make life-saving decisions. If you are looking for a reliable and high-quality diagnostic experience, look no further.

**Book your X Ray test at Apollo Clinic in Mandi House, New Delhi.**

### FAQ

**Q1: Is an X-ray painful?**
A: No, the X-ray itself is completely painless. You just need to stay still for a few seconds.

**Q2: How long does the test take?**
A: Most X-ray procedures take only 10 to 15 minutes from start to finish.

**Q3: Can I eat before an X-ray?**
A: In most cases, yes. However, for certain specialized X-rays (like those of the digestive tract), you might be asked to fast.

**Q4: Are digital X-rays better?**
A: Yes, they offer better image quality, faster results, and lower radiation exposure compared to traditional film.`,
    author: 'Dr. Sharma',
    category: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-15',
    createdAt: new Date().toISOString()
  },
  { 
    id: '2', 
    title: 'ECG Test: What It Is, Why It Is Done, and What Results Mean', 
    excerpt: 'Everything you need to know about the ECG Test in New Delhi, from preparation to understanding your heart health results.',
    content: `## Introduction to ECG

An Electrocardiogram, commonly known as an ECG or EKG, is one of the simplest and fastest tests used to evaluate the heart. If you are looking for an **ECG Test in New Delhi**, it is important to understand that this non-invasive test is a cornerstone of cardiac care. It records the electrical activity of your heart to show how fast it is beating and whether its rhythm is steady or irregular.

## What an ECG Test Measures

The heart produces tiny electrical impulses with every beat. An **ECG diagnostic center** uses electrodes placed on the skin to detect these impulses. The test measures:
- The timing and duration of each electrical phase in your heartbeat.
- The strength of the electrical signals as they pass through different parts of the heart.

## Signs You May Need an ECG

Your doctor may recommend a **heart test ECG** if you experience:
- Chest pain
- Dizziness or lightheadedness
- Heart palpitations (racing or fluttering heart)
- Shortness of breath
- Extreme tiredness or weakness

## How the ECG Test Is Performed

The procedure is quick and painless:
1. You will lie down on a table.
2. A technician will attach small, sticky sensors (electrodes) to your chest, arms, and legs.
3. These sensors are connected to a machine that records the electrical signals.
4. You will need to lie still for a few minutes while the machine records the data.

## Understanding ECG Results

An ECG provides a "tracing" of your heart's activity. A doctor will look for:
- **Heart Rate:** Too fast (tachycardia) or too slow (bradycardia).
- **Heart Rhythm:** Irregularities (arrhythmias).
- **Heart Attack:** Evidence of a previous or ongoing heart attack.
- **Structural Abnormalities:** Such as heart chamber enlargement.

## Benefits of Early Heart Screening

A **cardiac checkup Delhi** can be life-saving. Early detection of heart issues allows for:
- Timely intervention and treatment.
- Prevention of serious complications like stroke or heart failure.
- Peace of mind for those with a family history of heart disease.

## ECG vs Other Heart Tests

While an ECG is a great first step, other tests like a TMT (Treadmill Test) or 2D Echo provide different information. An ECG looks at electrical activity, while an Echo looks at the physical structure and blood flow.

## When to Consult a Doctor

If you have risk factors like high blood pressure, diabetes, or high cholesterol, regular heart screenings are essential. Don't wait for symptoms to appear.

## Choosing the Right Diagnostic Center

For an accurate **ECG Test in New Delhi**, choose a facility with modern equipment and experienced cardiologists. Apollo Clinic in Mandi House provides comprehensive cardiac diagnostics in a comfortable setting.

### FAQ

**Q1: Is an ECG safe?**
A: Yes, it is completely safe and non-invasive. No electricity is sent into your body; the machine only records your heart's natural electrical signals.

**Q2: Do I need to fast before an ECG?**
A: No, fasting is generally not required for a standard ECG.

**Q3: How long does the test take?**
A: The actual recording takes only a few minutes. The entire process, including setup, takes about 10-15 minutes.

**Q4: Can an ECG detect all heart problems?**
A: While very useful, an ECG might not detect all issues, especially if they are intermittent. Your doctor might recommend further testing if symptoms persist.

**Book your ECG test at Apollo Clinic in Mandi House, New Delhi.**`,
    author: 'Dr. Verma',
    category: 'Heart Health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-14',
    createdAt: new Date().toISOString()
  },
  { 
    id: '3', 
    title: 'How Physiotherapy Helps in Pain Relief and Faster Recovery', 
    excerpt: 'Discover why our Physiotherapy Clinic in New Delhi is the preferred choice for back pain treatment and sports injury rehabilitation.',
    content: `## Introduction to Physiotherapy

Physiotherapy is a healthcare profession that focuses on restoring movement and function to the body after an injury, illness, or disability. If you are searching for a **Physiotherapy Clinic in New Delhi**, you are likely looking for a way to manage pain and improve your quality of life without relying solely on medication.

## Conditions Treated by Physiotherapy

Physiotherapy is effective for a wide range of conditions:
- **Musculoskeletal:** Back pain, neck pain, and joint issues.
- **Neurological:** Stroke recovery, Multiple Sclerosis, and Parkinson's.
- **Respiratory:** Asthma and Cystic Fibrosis.
- **Cardiovascular:** Rehabilitation after a heart attack.

## Benefits of Physiotherapy Treatment

The primary goal of **rehabilitation therapy** is to help you return to your normal activities. Benefits include:
- Pain reduction and management.
- Improved mobility and balance.
- Recovery from injury or surgery.
- Prevention of future injuries.
- Avoiding surgery in some cases.

## Physiotherapy for Back Pain

Back pain is one of the most common reasons people seek help. Our **back pain treatment Delhi** focuses on:
- Strengthening core muscles.
- Improving posture.
- Manual therapy to reduce stiffness.
- Education on ergonomics.

## Physiotherapy for Sports Injuries

Athletes often require specialized care. **Sports injury physiotherapy** helps in:
- Rapid recovery from sprains and strains.
- Specific exercises to regain strength and agility.
- Taping and bracing for support.

## Role of Exercise Therapy

Exercise is a core component of physiotherapy. Your therapist will design a customized program of stretching and strengthening exercises tailored to your specific needs.

## How Many Sessions Are Required?

The number of sessions depends on the severity of your condition and how your body responds to treatment. Some minor issues may resolve in 3-5 sessions, while chronic conditions might require ongoing therapy.

## Tips for Faster Recovery

1. **Be Consistent:** Follow your exercise plan at home.
2. **Listen to Your Body:** Don't push too hard, but stay active.
3. **Stay Hydrated:** Water is essential for muscle health.
4. **Communicate:** Keep your therapist informed about your progress and any pain.

## Choosing a Physiotherapy Clinic

When looking for a **Physiotherapy Clinic in New Delhi**, consider the expertise of the therapists and the facilities available. Apollo Clinic in Mandi House offers personalized care with experienced physiotherapists.

### FAQ

**Q1: Do I need a doctor's referral for physiotherapy?**
A: While not always required, a referral can help your therapist understand your medical history better.

**Q2: Is physiotherapy painful?**
A: Some exercises might be challenging, but the goal is to reduce pain, not cause it. Always tell your therapist if something hurts.

**Q3: What should I wear to my session?**
A: Wear loose, comfortable clothing that allows you to move easily and gives the therapist access to the area being treated.

**Q4: How long is each session?**
A: Typically, a session lasts between 30 to 60 minutes.

**Book your physiotherapy consultation at Apollo Clinic in Mandi House, New Delhi.**`,
    author: 'Dr. Gupta',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-13',
    createdAt: new Date().toISOString()
  },
  { 
    id: '4', 
    title: 'Ultrasound Test: Uses, Procedure, and Benefits', 
    excerpt: 'Learn about the versatility and safety of the Ultrasound Test in New Delhi at our state-of-the-art diagnostic imaging center.',
    content: `## Introduction to Ultrasound Imaging

Ultrasound imaging, also known as sonography, uses high-frequency sound waves to view inside the body. Because it uses sound waves rather than radiation, it is a preferred method for many diagnostic needs. If you need an **Ultrasound Test in New Delhi**, understanding the process can help you feel more at ease.

## How Ultrasound Works

An ultrasound machine sends sound waves into your body using a small probe called a transducer. These waves bounce off internal organs and tissues, creating echoes. The machine records these echoes and turns them into real-time images or videos.

## Common Uses of Ultrasound

Ultrasound is incredibly versatile and used for:
- Viewing the uterus and ovaries during pregnancy.
- Diagnosing gallbladder disease.
- Evaluating blood flow.
- Guiding a needle for biopsy or tumor treatment.
- Examining a breast lump.
- Checking your thyroid gland.

## Pregnancy Ultrasound

Perhaps the most well-known use, an **ultrasound scan Delhi** is essential during pregnancy to:
- Confirm pregnancy.
- Check the baby's age and growth.
- Monitor the baby's heart rate and movements.
- Screen for certain conditions.

## Abdominal Ultrasound

This is used to examine organs like the liver, gallbladder, spleen, pancreas, and kidneys. It can help find the cause of stomach pain or bloating.

## Safety of Ultrasound Imaging

One of the biggest benefits of ultrasound is its safety. Since it doesn't use ionizing radiation, there are no known harmful effects on humans. This makes it the gold standard for fetal monitoring.

## What to Expect During the Test

1. You will lie on an examination table.
2. A clear gel will be applied to your skin. This helps the sound waves travel.
3. The technician will move the transducer over the area being examined.
4. You might be asked to hold your breath or change positions.

## Preparing for an Ultrasound

Preparation varies depending on the type of scan:
- **Abdominal Scan:** You may need to fast for several hours.
- **Pelvic Scan:** You may need a full bladder, requiring you to drink plenty of water beforehand.

## Choosing a Diagnostic Center

For a high-quality **Ultrasound Test in New Delhi**, choose a **diagnostic imaging center Delhi** with experienced sonologists. Apollo Clinic in Mandi House provides accurate results with the latest imaging technology.

### FAQ

**Q1: Does an ultrasound hurt?**
A: No, it is a painless and non-invasive procedure.

**Q2: How long does the scan take?**
A: Most scans take between 20 to 45 minutes.

**Q3: Can I see the images during the test?**
A: In many cases, yes, the technician can show you the monitor.

**Q4: Is there any downtime after the test?**
A: No, you can return to your normal activities immediately.

**Book your ultrasound appointment at Apollo Clinic in Mandi House, New Delhi.**`,
    author: 'Dr. Khanna',
    category: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-12',
    createdAt: new Date().toISOString()
  },
  { 
    id: '5', 
    title: 'Why Regular Heart Health Screening Is Important', 
    excerpt: 'Prioritize your cardiovascular wellness with a regular Heart Health Checkup in New Delhi at Apollo Clinic.',
    content: `## Introduction to Heart Health

Your heart is the engine of your body, working tirelessly to pump life-sustaining blood to every cell. However, heart disease remains a leading cause of health issues globally. Prioritizing a **Heart Health Checkup in New Delhi** is the first step toward a long and healthy life.

## Common Heart Diseases

Heart disease isn't just one condition. It includes:
- **Coronary Artery Disease:** Damage to the heart's major blood vessels.
- **Arrhythmias:** Irregular heartbeats.
- **Heart Valve Disease:** Problems with the valves that control blood flow.
- **Heart Failure:** When the heart can't pump blood as well as it should.

## Importance of Early Detection

Many heart conditions develop silently, showing no symptoms until they become serious. Early detection through a **heart diagnostic test** can:
- Identify risks before they lead to a heart attack or stroke.
- Allow for lifestyle changes that can reverse early damage.
- Provide a baseline for future comparisons.

## Tests Used for Heart Screening

A comprehensive screening often includes:
- **ECG test Delhi:** To check electrical activity.
- **TMT test Delhi:** To see how your heart handles physical stress.
- **2D Echo:** An ultrasound of the heart to see its structure and function.

## Symptoms That Should Not Be Ignored

While screenings are for those without symptoms, seek immediate help if you experience:
- Chest pain or pressure.
- Shortness of breath.
- Pain in the neck, jaw, or throat.
- Numbness or coldness in your legs or arms.

## Lifestyle Tips for Heart Health

1. **Eat a Balanced Diet:** Focus on fruits, vegetables, and whole grains.
2. **Exercise Regularly:** Aim for at least 30 minutes of moderate activity most days.
3. **Manage Stress:** Practice relaxation techniques like yoga or meditation.
4. **Quit Smoking:** Smoking is a major risk factor for heart disease.

## When to Get Regular Checkups

Adults should start regular heart screenings by age 20. The frequency depends on your risk factors, such as family history, weight, and blood pressure.

## Choosing a Reliable Diagnostic Clinic

For a thorough **Heart Health Checkup in New Delhi**, trust a clinic with a track record of excellence. Apollo Clinic in Mandi House offers a range of cardiac packages designed to give you a complete picture of your heart health.

### FAQ

**Q1: How often should I get a heart checkup?**
A: Generally, once a year is recommended for most adults, but your doctor may suggest more frequent checks if you have risk factors.

**Q2: What is a TMT test?**
A: A Treadmill Test (TMT) measures your heart's response to physical exertion while you walk on a treadmill.

**Q3: Is a 2D Echo necessary if my ECG is normal?**
A: Sometimes yes, as they provide different information. An Echo can see structural issues that an ECG might miss.

**Q4: Can heart disease be prevented?**
A: In many cases, yes. A healthy lifestyle combined with early detection can significantly reduce your risk.

**Book your heart screening at Apollo Clinic in Mandi House, New Delhi.**`,
    author: 'Dr. Reddy',
    category: 'Heart Health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-11',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_SETTINGS = {
  clinicName: 'Apollo Clinic',
  phone: '+91 78070 50555',
  address: 'Main Road, Near City Center, Shimla, HP',
  email: 'info@apolloclinic.com',
  workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.0716474134!2d77.1685!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzE3LjMiTiA3N8KwMTAnMDYuNiJF!5e0!3m2!1sen!2sin!4v1647250000000!5m2!1sen!2sin'
};

// Initialize Storage
if (!localStorage.getItem('clinic_services')) setStorageItem('clinic_services', INITIAL_SERVICES);
if (!localStorage.getItem('clinic_appointments')) setStorageItem('clinic_appointments', []);
if (!localStorage.getItem('clinic_messages')) setStorageItem('clinic_messages', []);
if (!localStorage.getItem('clinic_settings')) setStorageItem('clinic_settings', INITIAL_SETTINGS);
if (!localStorage.getItem('clinic_blog')) setStorageItem('clinic_blog', INITIAL_BLOG_POSTS);
if (!localStorage.getItem('clinic_admin')) setStorageItem('clinic_admin', { id: 'Admin123', password: 'jhajha123' });

export const mockService = {
  // Auth
  login: async (id: string, pass: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const admin = getStorageItem('clinic_admin', {});
    if (id === admin.id && pass === admin.password) {
      const user = { uid: 'admin-uid', email: 'admin123@apolloclinic.com', displayName: 'Admin' };
      localStorage.setItem('clinic_session', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  logout: () => {
    localStorage.removeItem('clinic_session');
  },
  getCurrentUser: () => {
    const session = localStorage.getItem('clinic_session');
    return session ? JSON.parse(session) : null;
  },

  // Generic CRUD
  getItems: async (collection: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    return getStorageItem(`clinic_${collection}`, []);
  },
  addItem: async (collection: string, item: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    setStorageItem(`clinic_${collection}`, [newItem, ...items]);
    return newItem;
  },
  updateItem: async (collection: string, id: string, updates: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const updatedItems = items.map((item: any) => item.id === id ? { ...item, ...updates } : item);
    setStorageItem(`clinic_${collection}`, updatedItems);
  },
  deleteItem: async (collection: string, id: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const filteredItems = items.filter((item: any) => item.id !== id);
    setStorageItem(`clinic_${collection}`, filteredItems);
  },

  // Settings
  getSettings: async () => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    return getStorageItem('clinic_settings', INITIAL_SETTINGS);
  },
  updateSettings: async (settings: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    setStorageItem('clinic_settings', settings);
  },

  // Real-time simulation (simplified)
  subscribe: (collection: string, callback: (items: any[]) => void) => {
    const items = getStorageItem(`clinic_${collection}`, []);
    callback(items);
    
    // Check for changes every 2 seconds (very basic simulation)
    const interval = setInterval(() => {
      const currentItems = getStorageItem(`clinic_${collection}`, []);
      callback(currentItems);
    }, 2000);
    
    return () => clearInterval(interval);
  }
};
