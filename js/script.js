// script.js - 个人博客交互功能

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化应用程序
    initApp();
});

/**
 * 初始化应用程序
 */
function initApp() {
    // 设置主题切换功能
    setupThemeToggle();
    
    // 设置导航栏滚动效果
    setupNavbarScroll();
    
    // 设置移动端菜单切换
    setupMobileMenu();
    
    // 设置搜索功能
    setupSearch();
    
    // 生成照片墙
    generatePhotoGrid();
    
    // 生成文章列表
    generateArticles();
    
    // 生成标签云
    generateTags();
    
    // 设置标签点击事件
    setupTagClick();
    
    // 设置滚动动画
    setupScrollAnimation();
}

/**
 * 设置主题切换功能
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // 切换主题
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * 设置导航栏滚动效果
 */
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navbarContent = document.querySelector('.navbar-content');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动时缩小导航栏
        if (scrollTop > 50) {
            navbar.classList.add('shrink');
            navbarContent.style.padding = '8px 0';
        } else {
            navbar.classList.remove('shrink');
            navbarContent.style.padding = '15px 0';
        }
        
        // 记录当前滚动位置
        lastScrollTop = scrollTop;
    });
}

/**
 * 设置移动端菜单切换
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // 点击菜单项后关闭菜单（移动端）
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

/**
 * 设置搜索功能
 */
function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.getElementById('searchContainer');
    const searchClose = document.getElementById('searchClose');
    
    // 打开搜索框
    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.add('active');
        });
    }
    
    // 关闭搜索框
    searchClose.addEventListener('click', function() {
        searchContainer.classList.remove('active');
    });
    
    // 点击搜索框外部关闭
    searchContainer.addEventListener('click', function(e) {
        if (e.target === searchContainer) {
            searchContainer.classList.remove('active');
        }
    });
    
    // 搜索框输入事件
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
}

/**
 * 执行搜索
 * @param {string} query - 搜索查询
 */
function performSearch(query) {
    if (query.trim() === '') return;
    
    // 在实际应用中，这里会向服务器发送搜索请求
    // 这里只是模拟搜索功能
    alert(`搜索: ${query}\n\n此功能在实际部署时需要后端支持。`);
    
    // 关闭搜索框
    document.getElementById('searchContainer').classList.remove('active');
}

/**
 * 生成照片墙
 */
function generatePhotoGrid() {
    const photoGrid = document.querySelector('.photo-grid');
    if (!photoGrid) return;
    
    const photos = [
        {
            id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '晨间咖啡时光'
        },
        {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '图书馆的静谧午后'
        },
        {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '海边日落漫步'
        },
        {
            id: 4,
            imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '工作室的绿植角落'
        },
        {
            id: 5,
            imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '城市夜景随拍'
        },
        {
            id: 6,
            imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '雪山徒步记录'
        },
        {
            id: 7,
            imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '自制健康早餐'
        },
        {
            id: 8,
            imageUrl: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '摄影器材收藏'
        },
        {
            id: 9,
            imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            caption: '阅读与笔记时间'
        }
    ];
    
    // 清空照片墙
    photoGrid.innerHTML = '';
    
    // 生成照片项
    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.imageUrl}" alt="${photo.caption}" loading="lazy">
            <div class="photo-overlay">
                <p class="photo-caption">${photo.caption}</p>
            </div>
        `;
        photoGrid.appendChild(photoItem);
    });
}

/**
 * 生成文章列表
 */
function generateArticles() {
    const articlesList = document.querySelector('.articles-list');
    if (!articlesList) return;
    
    const articles = [
        {
            id: 1,
            title: '城市漫步：发现街头隐藏的美',
            excerpt: '在繁忙的都市中寻找那些被忽略的角落，记录下城市不为人知的另一面。从老建筑到街头艺术，每一处都有故事等待被发现。',
            tag: '城市漫步 • 2023年5月',
            colorClass: 'pink',
            icon: 'fa-city'
        },
        {
            id: 2,
            title: '手冲咖啡的艺术与科学',
            excerpt: '从咖啡豆的选择到水温控制，探索手冲咖啡背后的精细工艺。分享我的个人配方和提升咖啡体验的小技巧。',
            tag: '咖啡 • 2023年4月',
            colorClass: 'blue',
            icon: 'fa-coffee'
        },
        {
            id: 3,
            title: '极简主义生活实践指南',
            excerpt: '如何在数字时代保持生活的简约与专注。分享我在物品管理、数字整理和心理空间清理方面的实践经验。',
            tag: '极简生活 • 2023年3月',
            colorClass: 'terracotta',
            icon: 'fa-leaf'
        },
        {
            id: 4,
            title: '入门摄影：用手机捕捉美好瞬间',
            excerpt: '无需专业设备，用手机也能拍出令人惊艳的照片。分享构图技巧、光线运用和后期处理的基础知识。',
            tag: '摄影 • 2023年2月',
            colorClass: 'pink',
            icon: 'fa-camera'
        }
    ];
    
    // 清空文章列表
    articlesList.innerHTML = '';
    
    // 生成文章卡片
    articles.forEach(article => {
        const articleCard = document.createElement('article');
        articleCard.className = 'article-card';
        articleCard.innerHTML = `
            <div class="article-image ${article.colorClass}">
                <i class="fas ${article.icon}"></i>
            </div>
            <div class="article-content">
                <h4 class="article-title">${article.title}</h4>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="article-tag">${article.tag}</span>
                    <a href="#" class="article-read">阅读全文 <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        articlesList.appendChild(articleCard);
    });
}

/**
 * 生成标签云
 */
function generateTags() {
    const tagsCloud = document.querySelector('.tags-cloud');
    if (!tagsCloud) return;
    
    const tags = [
        '摄影', '咖啡', '极简生活', '城市漫步', '阅读', '旅行',
        '美食', '设计', '音乐', '写作', '植物', '手工艺',
        '数码产品', '电影', '运动', '冥想'
    ];
    
    // 清空标签云
    tagsCloud.innerHTML = '';
    
    // 生成标签
    tags.forEach((tag, index) => {
        const tagElement = document.createElement('a');
        tagElement.href = '#';
        tagElement.className = 'tag';
        if (index === 0) tagElement.classList.add('active');
        tagElement.textContent = tag;
        tagElement.dataset.tag = tag;
        tagsCloud.appendChild(tagElement);
    });
}

/**
 * 设置标签点击事件
 */
function setupTagClick() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有标签的active类
            tags.forEach(t => t.classList.remove('active'));
            
            // 给当前点击的标签添加active类
            this.classList.add('active');
            
            // 在实际应用中，这里会过滤显示相关文章
            // 这里只是模拟标签筛选功能
            const tagName = this.dataset.tag;
            console.log(`筛选标签: ${tagName}`);
            
            // 显示提示
            showNotification(`正在筛选标签: ${tagName}`);
        });
    });
}

/**
 * 设置滚动动画
 */
function setupScrollAnimation() {
    // 使用Intersection Observer API检测元素是否进入视口
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.intro-card, .photo-grid-section, .articles-section, .tags-section, .sidebar-card');
    animateElements.forEach(element => {
        // 添加初始状态类
        element.classList.add('fade-up');
        observer.observe(element);
    });
}

/**
 * 显示通知
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 检查是否已存在通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--soft-pink);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    // 添加动画关键帧
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
        if (styleSheet.parentNode) {
            styleSheet.remove();
        }
    }, 3000);
}

// 添加CSS动画类
const style = document.createElement('style');
style.textContent = `
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);