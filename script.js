// ===== 粒子背景 =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['rgba(99,102,241,0.6)', 'rgba(168,85,247,0.5)', 'rgba(236,72,153,0.4)', 'rgba(0,212,255,0.5)', 'rgba(245,158,11,0.3)'];
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 15 + 10}s;
            animation-delay: ${Math.random() * 10}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;
        container.appendChild(particle);
    }
}
createParticles();

// ===== 鼠标跟随光效 =====
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== 导航栏功能 =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// 滚动时导航栏效果
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // 更新活动导航链接
    updateActiveNavLink();
});

// 移动端菜单切换
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== 作品筛选功能 =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioSections = document.querySelectorAll('.portfolio-section');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 更新按钮状态
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // 筛选作品
        if (filter === 'all') {
            portfolioSections.forEach(section => {
                section.classList.remove('hidden');
            });
            portfolioItems.forEach(item => {
                item.classList.remove('hidden');
            });
        } else {
            portfolioSections.forEach(section => {
                if (section.getAttribute('data-category') === filter) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        }
    });
});

// ===== 弹窗功能 =====
const modal = document.getElementById('portfolioModal');
const modalBody = document.getElementById('modalBody');

// 作品内容数据
const portfolioData = {
    whitepaper1: {
        title: '《2026 AI面试发展趋势白皮书》',
        tag: '白皮书',
        sections: [
            {
                title: '项目背景',
                content: '海纳AI面试作为AI招聘领域的创新产品，需要通过权威内容建立行业话语权。白皮书是B2B营销中获取高质量销售线索的重要工具。'
            },
            {
                title: '我的思考',
                content: '如何用行业趋势话题撬动销售线索？关键在于找到"趋势洞察"与"产品价值"的结合点。不是单纯讲AI技术多先进，而是讲AI如何解决HR的真实痛点——招聘效率低、面试标准不统一、候选人体验差。'
            },
            {
                title: '策略思路',
                content: '1. 选题：选择"AI面试发展趋势"而非"产品介绍"，降低阅读门槛，扩大受众面<br>2. 结构：行业趋势 → 痛点分析 → 解决方案 → 案例佐证 → 未来展望<br>3. 数据：引用权威第三方数据，增强可信度<br>4. 设计：专业视觉设计，提升阅读体验'
            },
            {
                title: '最终成果',
                content: '• 白皮书成为销售团队核心获客工具<br>• 为前端销售提供了强有力的信任背书<br>• 累计下载量数千次，带来高质量销售线索'
            }
        ]
    },
    whitepaper2: {
        title: '《海纳AI面试官案例实操指南》',
        tag: '产品手册',
        sections: [
            {
                title: '项目背景',
                content: '客户购买AI面试产品后，往往面临"不会用"的问题，导致产品 adoption 率低。需要一份实操指南降低使用门槛。'
            },
            {
                title: '我的思考',
                content: '产品手册怎样写才能降低使用门槛？传统的产品手册往往是功能罗列，用户看不懂也不想看。我采用"场景化+步骤化"的思路，让用户跟着做就能上手。'
            },
            {
                title: '策略思路',
                content: '1. 场景切入：从HR的真实工作场景出发（如"校招季如何快速筛选1000份简历"）<br>2. 步骤拆解：每个功能都配"步骤1、2、3"，降低认知负担<br>3. 图文并茂：截图+标注，一眼看懂操作位置<br>4. 案例穿插：美的、沪上阿姨等标杆客户的使用方法'
            },
            {
                title: '最终成果',
                content: '• 客户反馈"终于有份能看懂的说明书了"<br>• 产品使用门槛显著降低<br>• 客户成功团队的工作效率提升'
            }
        ]
    },
    case1: {
        title: '美的/沪上阿姨标杆案例',
        tag: '客户案例',
        sections: [
            {
                title: '项目背景',
                content: 'B2B销售中，客户最信任的是"同行怎么说"。美的和沪上阿姨作为各自行业的头部企业，其使用案例具有极强的说服力。'
            },
            {
                title: '我的思考',
                content: '客户成功案例的"故事感"从何而来？不是简单罗列数据，而是要讲一个"挑战-行动-成果"的故事，让潜在客户产生"他们的情况和我们很像，他们能做到我们也能"的共鸣。'
            },
            {
                title: '策略思路',
                content: '1. 背景：客户面临什么挑战？（如美的校招量大、面试官资源紧张）<br>2. 选型：为什么选海纳AI？对比了哪些方案？<br>3. 实施：上线过程遇到什么问题？如何解决的？<br>4. 成果：量化数据（效率提升X%、成本降低Y%）+ 客户证言<br>5. 可复制性：其他企业如何借鉴？'
            },
            {
                title: '最终成果',
                content: '• 案例成为销售打单的核心物料<br>• 触达同行业潜在客户10000+人<br>• 显著提升销售转化率'
            }
        ]
    },
    guide1: {
        title: '《B2B企业直播搭建指南》',
        tag: '营销手册',
        sections: [
            {
                title: '项目背景',
                content: '致趣科技的产品是B2B营销SaaS，目标客群是B2B企业的市场负责人。直播是当时B2B营销的热门话题，但很多企业不知道怎么做。'
            },
            {
                title: '我的思考',
                content: '干货内容如何设计转化路径？免费干货容易吸引流量，但如何把流量转化为线索？关键在于"价值阶梯"——先给价值，再引导下一步。'
            },
            {
                title: '策略思路',
                content: '1. 内容：从0到1讲清楚B2B直播怎么做（选题、嘉宾、推广、转化）<br>2. 门槛：免费下载，但需要留资（姓名、公司、职位、邮箱）<br>3. 跟进：下载后销售跟进，推荐致趣的直播解决方案<br>4. 复用：内容拆解成系列文章、短视频，多渠道分发'
            },
            {
                title: '最终成果',
                content: '• 累计下载5000+次<br>• 带来新会员300+<br>• 内容线索数增长9000'
            }
        ]
    },
    yexiao: {
        title: '北京青年夜校',
        tag: '核心项目',
        sections: [
            {
                title: '项目背景',
                content: '2024年，"夜校"成为年轻人追捧的新生活方式。我从0到1创办北京青年夜校，完整操盘从策划到运营到变现的全过程。'
            },
            {
                title: '为什么选夜校这个赛道？',
                content: '1. 需求真实：年轻人想学习新技能、拓展社交圈，但传统培训太贵、太正式<br>2. 供给稀缺：市场上缺乏高性价比、轻松有趣的成人兴趣班<br>3. 模式可行：低价体验课降低决策门槛，正价课实现盈利<br>4. 传播性强："夜校"自带话题属性，容易在社交媒体传播'
            },
            {
                title: '抖音爆款内容的共性是什么？',
                content: '1. 黄金3秒：开头直接抛出痛点或亮点（如"500元上12节课"）<br>2. 情绪价值：展示学员的真实反馈和开心瞬间<br>3. 信息密度：短时间内讲清楚"是什么、多少钱、怎么报名"<br>4. 行动引导：明确告诉用户"点击主页私信报名"<br>5. 矩阵打法：主号+多个分校区账号，形成内容矩阵'
            },
            {
                title: '私域6W+用户如何精细化运营？',
                content: '1. 分层：按兴趣标签分组（摄影、烘焙、瑜伽等）<br>2. 承接：新用户入群后自动发送课程介绍和体验课链接<br>3. 激活：每周固定时间发布新课表，用接龙方式报名<br>4. 裂变：老学员推荐新学员，双方各得优惠<br>5. 复购：体验课满意后引导购买正价课包'
            },
            {
                title: '低价体验课到正价课的转化逻辑？',
                content: '1. 低价体验课（如49元/2节）：降低决策门槛，让用户先感受价值<br>2. 课程设计：体验课要"完整但不完整"——让用户学到东西，但意识到需要系统学习<br>3. 正价课推荐：体验课结束后，趁热打铁推荐正价课包<br>4. 社群氛围：通过学员分享、老师互动，营造学习氛围，增强粘性<br>5. 限时优惠：制造紧迫感，促进决策'
            },
            {
                title: '最终成果',
                content: '• 6W+私域用户沉淀<br>• 10条100W+播放量抖音视频<br>• 3个月实现100W流水<br>• 7000+付费学员<br>• 获央视、人民日报等媒体报道<br>• 与代乐乐、飞飞等本地头部达人达成深度合作'
            }
        ]
    },
    video1: {
        title: '海纳AI面试官品牌宣传片',
        tag: '品牌视频',
        sections: [
            {
                title: '项目背景',
                content: '海纳AI面试需要一个品牌宣传片，在官网、展会、销售拜访等场景使用，快速建立品牌认知。'
            },
            {
                title: '我的思考',
                content: '品牌视频如何平衡"高级感"与"易懂性"？B2B产品容易陷入"讲功能"的枯燥，或者"太抽象"看不懂。我采用"场景故事+产品演示"的结合方式。'
            },
            {
                title: '策略思路',
                content: '1. 开场：HR忙碌工作的场景，引发共鸣<br>2. 冲突：招聘季压力大、效率低、质量难保证<br>3. 解决方案：AI面试官如何帮助HR<br>4. 产品演示：简洁展示核心功能<br>5. 客户证言：真实客户的使用反馈<br>6. 结尾：品牌slogan + 行动号召'
            },
            {
                title: '最终成果',
                content: '• 视频成为品牌对外展示的核心素材<br>• 官网、展会、销售拜访等多场景使用<br>• 客户反馈"一看就懂产品是做什么的"'
            }
        ]
    },
    video2: {
        title: 'AI面试官实操指南系列',
        tag: '产品教育',
        sections: [
            {
                title: '项目背景',
                content: '客户购买产品后，需要学习如何使用。传统的文字说明书阅读体验差，视频教程更直观易懂。'
            },
            {
                title: '我的思考',
                content: '产品教程怎样拍才不枯燥？关键在于"场景化"——不是讲功能按钮在哪里，而是讲"当你需要做X时，怎么操作"。'
            },
            {
                title: '策略思路',
                content: '1. 一客一版：为星巴克、百果园、达美乐等不同行业客户定制专属教程<br>2. 场景切入：从客户的真实使用场景出发<br>3. 步骤演示：详细展示每一步操作<br>4. 常见Q&A：预判客户可能遇到的问题<br>5. 短小精悍：每个视频控制在3-5分钟，降低观看负担'
            },
            {
                title: '最终成果',
                content: '• 大幅降低客户的产品使用门槛<br>• 减少客户成功团队的重复培训工作量<br>• 客户满意度提升'
            }
        ]
    },
    video3: {
        title: '狐椒直播栏目',
        tag: '直播IP',
        sections: [
            {
                title: '项目背景',
                content: '搜狐狐椒需要打造一档文旅行业的直播栏目，建立行业影响力，持续获客。'
            },
            {
                title: '我的思考',
                content: '如何持续产出40+期不冷场？关键在于"内容体系化+嘉宾资源池"。不能每次都从零想选题，而是建立可持续的内容生产机制。'
            },
            {
                title: '策略思路',
                content: '1. 栏目定位：微课堂（知识分享）+ 微论坛（行业讨论），双轮驱动<br>2. 嘉宾体系：建立文旅行业专家库，每月固定邀约<br>3. 内容规划：提前一个季度规划主题，确保内容不断档<br>4. 流程标准化：从邀约、彩排、直播到回放，每个环节SOP化<br>5. 全渠道推广：公众号预热、社群提醒、多平台同步直播'
            },
            {
                title: '最终成果',
                content: '• 累计直播40+期<br>• 单期平均观看量20000+<br>• 成为文旅行业有影响力的直播IP<br>• 持续为搜狐狐椒获客'
            }
        ]
    },
    video4: {
        title: '抖音爆款短视频',
        tag: '短视频',
        sections: [
            {
                title: '项目背景',
                content: '北京青年夜校项目需要在抖音快速获客，短视频是最有效的手段。'
            },
            {
                title: '我的思考',
                content: '爆款内容的"可复制性"在哪里？不是碰运气，而是找到"爆款公式"——什么类型的内容、什么结构、什么时间点发，容易火。'
            },
            {
                title: '策略思路',
                content: '1. 选题：围绕"夜校"话题，延展到"北京夜生活""下班后的生活""低成本兴趣学习"等<br>2. 结构：黄金3秒抓眼球 + 中间展示价值 + 结尾引导行动<br>3. 情绪：展示学员的真实快乐，营造向往感<br>4. 发布：测试不同时间段，找到最佳发布时间<br>5. 矩阵：主号+分校区号，形成内容矩阵，互相导流'
            },
            {
                title: '最终成果',
                content: '• 产出10条100W+播放量视频<br>• 单条视频引流私域1000+人<br>• 抖音成为最主要的获客渠道<br>• 形成可复制的爆款内容方法论'
            }
        ]
    }
};

// 打开弹窗
function openModal(projectId) {
    const data = portfolioData[projectId];
    if (!data) return;
    
    let html = `
        <span class="portfolio-tag">${data.tag}</span>
        <h2 class="modal-title">${data.title}</h2>
    `;
    
    data.sections.forEach(section => {
        html += `
            <div class="modal-section">
                <h4>${section.title}</h4>
                <p>${section.content}</p>
            </div>
        `;
    });
    
    modalBody.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 点击弹窗外部关闭
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== 联系表单 =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // 这里可以添加实际的表单提交逻辑
    alert(`感谢您的留言，${name}！我会尽快回复您。`);
    
    contactForm.reset();
});

// ===== 滚动动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.portfolio-item, .timeline-item, .skill-item, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 数字动画 =====
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateNumber() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
        }
    }
    
    updateNumber();
}

// 当统计数据进入视口时触发动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberEl = entry.target.querySelector('.stat-number, .featured-number');
            if (numberEl && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = numberEl.textContent;
                const num = parseInt(text.replace(/[^0-9]/g, ''));
                if (!isNaN(num)) {
                    numberEl.textContent = '0' + (text.includes('+') ? '+' : '');
                    animateNumber(numberEl, num);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box, .featured-stat-item').forEach(el => {
    statsObserver.observe(el);
});

console.log('🚀 杨招娣的营销作品集网站已加载完成！');
