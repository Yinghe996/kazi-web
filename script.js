// 页面导航
document.getElementById('start-game-btn').addEventListener('click', function() {
    showPage('room-page');
});

document.getElementById('join-room-btn').addEventListener('click', function() {
    const playerName = document.getElementById('player-name-input').value.trim();
    const roomCode = document.getElementById('room-code').value;
    
    if (!playerName) {
        alert('请输入你的名字');
        return;
    }
    
    if (roomCode.length !== 4 || isNaN(roomCode)) {
        alert('请输入有效的4位数字房间号');
        return;
    }
    
    // 模拟加入房间
    document.getElementById('room-number').textContent = roomCode;
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('room-display').style.display = 'block';
    showPage('character-page');
    generateCharacterCards();
});

document.getElementById('create-room-btn').addEventListener('click', function() {
    const playerName = document.getElementById('player-name-input').value.trim();
    const roomCode = document.getElementById('room-code').value;
    
    if (!playerName) {
        alert('请输入你的名字');
        return;
    }
    
    if (roomCode.length !== 4 || isNaN(roomCode)) {
        alert('请输入有效的4位数字房间号');
        return;
    }
    
    // 模拟创建房间
    document.getElementById('room-number').textContent = roomCode;
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('room-display').style.display = 'block';
    showPage('character-page');
    generateCharacterCards();
});

document.getElementById('exit-game-btn').addEventListener('click', function() {
    if (confirm('确定要退出游戏吗？')) {
        document.getElementById('room-display').style.display = 'none';
        showPage('home-page');
    }
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// 幻灯片功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// 随机数字生成器
document.querySelectorAll('.generator-btn').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        let min, max;
        
        switch(type) {
            case 'two':
                min = 10;
                max = 99;
                break;
            case 'three':
                min = 100;
                max = 999;
                break;
            case 'four':
                min = 1000;
                max = 9999;
                break;
        }
        
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        document.getElementById('number-result').textContent = randomNum;
    });
});

// 资源计算
document.getElementById('resource-input').addEventListener('input', function() {
    const value = parseInt(this.value) || 0;
    document.getElementById('resource-output').textContent = Math.floor(value * 1.5);
});

// 角色数据
const characters = [
    {
        name: "凌川",
        role: "河流摆渡人",
        background: "世代居住在河流旁的摆渡人，祖父曾是 MAT 队的临时后勤员，1973 年协助杰克奥特曼人间体乡秀树打捞战斗后沉入河底的奥特手镯碎片。家中堂屋供奉着祖父留下的 MAT 队徽章（编号两位数 '37'），以及泛黄的古籍 —— 上面用毛笔记录着 12 种水系怪兽的习性弱点，书页边缘还沾有当年河流的泥沙。",
        ability: "河流相关操作消耗减少20%"
    },
    {
        name: "凯伦",
        role: "失忆的宇宙观测员",
        background: "三年前驾驶的小型观测舰在村庄上空失控坠毁，被村民救起后便忘记了身份。他随身携带的金属牌（刻有四位数 '7029'）其实是光之国第 702 号观测站的密钥，每当靠近鬼冢，金属牌就会发烫，耳边会响起模糊的 '观测站失联''能量异常' 等声音。",
        ability: "可以提前感知鬼冢位置"
    },
    {
        name: "莫林",
        role: "圣域守护者后裔",
        background: "家族从江户时代就负责守护圣域，她从小在圣域的石柱群中长大，每天清晨要在祭坛前诵读奥特文字祷文，十岁时就能独立解读石柱上关于 '光之封印' 的预言。腰间挂着的两位数 '18' 个能量储存吊坠，对应家族世代守护的 18 个封印节点。",
        ability: "圣域效果增强50%"
    },
    {
        name: "陆岩",
        role: "地质研究所研究员",
        background: "父亲曾是 UGM 队员，1986 年在与安培拉星人麾下怪兽战斗时失踪，只留下一块带有黑色能量残留的岩石样本。为了寻找父亲的踪迹，他专注于研究岩石区域的异常能量，五年前在城郊岩石山区发现了与父亲遗留样本能量匹配的矿石。",
        ability: "岩石区域资源产出增加30%"
    }
];

// 生成角色卡片
function generateCharacterCards() {
    const characterContainer = document.getElementById('character-list');
    characterContainer.innerHTML = '';
    
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        
        card.innerHTML = `
            <h3 class="character-name">${character.name}</h3>
            <p class="character-role">${character.role}</p>
            <p class="character-description">${character.background}</p>
            <div class="character-ability">
                <p><strong>能力：</strong>${character.ability}</p>
            </div>
            <button class="btn btn-accent select-character" data-name="${character.name}">
                <i class="fas fa-user-check"></i> 选择角色
            </button>
        `;
        
        characterContainer.appendChild(card);
    });

    // 添加角色选择事件
    document.querySelectorAll('.select-character').forEach(button => {
        button.addEventListener('click', function() {
            const characterName = this.getAttribute('data-name');
            const character = characters.find(c => c.name === characterName);
            
            document.getElementById('character-ability').textContent = `已选择: ${character.name} - ${character.ability}`;
            showPage('game-page');
            generateMap();
        });
    });
}

// 年代数据
const eras = [
    {
        name: "景章竹年",
        description: "皇室以 '文治' 为核心国策，在都城设 '崇文馆'，召集天下学士整理前朝散佚典籍，耗时十年修成《太平文鉴》。民间私塾普及，寒门子弟可通过 '荐学制' 入馆修学，打破士族对知识的垄断。但士族虽失学权，仍掌控地方盐铁之利，常以财力干预荐举，寒门与士族的隐性博弈渐成暗流；同时，江南竹乡因过度伐竹制简，出现竹林枯萎、水土流失，部分学士开始试造 '树皮纸'，却因 '简贵纸贱' 的传统观念遭保守派抵制。",
        effect: ""
    },
    {
        name: "和璧永熙",
        description: "运河贯通南北后，扬州、苏州成为工艺重镇，玉雕、青瓷、云锦三大技艺达至巅峰 —— 玉雕师能在指尖大的玉料上雕出 '百鸟朝凤'，青瓷 '雨过天青' 釉色被皇室定为御用品。朝廷设 '百工署' 规范工艺标准，民间工匠可凭技艺获 '匠籍'，免除徭役。然过度开采昆仑山玉矿，导致矿洞坍塌、矿工逃亡；同时，南方漕运因富商囤积粮食抬价，出现 '运瓷易，运粮难' 的怪象，工艺繁荣下暗藏民生危机。",
        effect: ""
    },
    {
        name: "启元烬土",
        description: "历时五年的 '藩王之乱' 平定后，新帝颁布 '休养生息令'：将前朝残铁熔铸为农具，分予无地农民；在战乱废墟上建 '安业坊'，安置流民。但旧藩王残余势力潜伏民间，暗中散布 '复旧论'，煽动部分士族抵制均田制；同时，北方草原部落趁中原虚弱，频繁袭扰边境，复苏之路暗藏战火隐患。",
        effect: ""
    },
    {
        name: "昭星授时",
        description: "朝廷在洛阳建 '观星台'，由天文官 '司星郎' 观测星象，修订《大衍历》，将二十四节气精确到时辰，指导全国农作 —— 麦收、插秧皆依历法而行，粮产较前朝提升三成。民间兴起 '观星社'，士人以观星论道为雅事，但司星郎垄断 '星象解读权'，称 '民间观星易乱天意'，严禁百姓私藏观星仪器；同时，南方因气候异常，历法指导的农时与实际气候偏差渐大，部分农户因 '守历误农' 颗粒无收，引发对历法的质疑。",
        effect: ""
    },
    {
        name: "瀚海同风",
        description: "和亲公主带中原农技（如曲辕犁、水车）入草原，草原部落则将养马术、皮革工艺传入中原 —— 长安街头出现 '胡商坊'，售卖奶酪、胡琴；草原帐篷中开始使用中原青瓷。朝廷设 '互市监' 管理边境贸易，规定 '汉胡交易无差别征税'。但中原士族仍视草原文化为 '蛮俗'，禁止子女与胡人通婚；草原部分长老也担忧 '汉化' 会丢失部落传统，暗中阻挠年轻子弟学习中原技艺，文化融合暗藏隔阂。",
        effect: ""
    }
];

let currentEra = 0;

// 年代切换功能
document.getElementById('next-era-btn').addEventListener('click', function() {
    currentEra = (currentEra + 1) % eras.length;
    updateEraDisplay();
});

function updateEraDisplay() {
    document.getElementById('era-name').textContent = eras[currentEra].name;
    document.getElementById('era-description').textContent = eras[currentEra].description;
}

// 事件卡数据
const eventCards = [
    { 
        title: "神秘商人", 
        description: "你遇到了一位神秘的旅行商人，他出售各种稀有物品，但价格不菲。",
        effect: "获得随机资源" 
    },
    { 
        title: "古代遗迹", 
        description: "你发现了一座被遗忘的古代遗迹，里面可能藏有珍贵的宝物和知识。",
        effect: "科技值增加" 
    },
    { 
        title: "暴风雨", 
        description: "一场突如其来的暴风雨打乱了你的行程，你需要寻找避难所。",
        effect: "移动力减少" 
    },
    { 
        title: "友好部落", 
        description: "你遇到了一个友好的部落，他们邀请你参加他们的庆典活动。",
        effect: "获得外交加成" 
    },
    { 
        title: "迷失森林", 
        description: "你在一片神秘的森林中迷路了，需要找到正确的方向。",
        effect: "探索时间增加" 
    }
];

// 事件卡抽取功能
document.getElementById('draw-card-btn').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * eventCards.length);
    const card = eventCards[randomIndex];
    
    document.getElementById('event-title').textContent = card.title;
    document.getElementById('event-description').textContent = card.description;
    document.getElementById('event-effect').textContent = `效果：${card.effect}`;
});

// 地图生成功能
const mapTypes = ['empty', 'river', 'rock', 'village', 'ghost', 'sanctuary', 'forest'];
const MAP_SIZE = 100; // 10x10 网格

let gameMap = [];
let villageStates = {};
let largeVillages = new Set();
let turnCount = 0;

// 地形数量限制
const TERRAIN_LIMITS = {
    total: { min: 70, max: 80 },
    river: { min: 35, max: 40 },
    village: { min: 10, max: 15 },
    ghost: { min: 5, max: 7 },
    sanctuary: { min: 4, max: 5 }
};

function generateMap() {
    const mapGrid = document.getElementById('map-grid');
    mapGrid.innerHTML = '';
    gameMap = [];
    villageStates = {};
    largeVillages = new Set();
    turnCount = 0;
    
    // 初始化所有格子为空
    for (let i = 0; i < MAP_SIZE; i++) {
        gameMap.push('empty');
    }
    
    // 生成指定数量的地形
    generateSpecificTerrain('river', TERRAIN_LIMITS.river.min, TERRAIN_LIMITS.river.max);
    generateSpecificTerrain('village', TERRAIN_LIMITS.village.min, TERRAIN_LIMITS.village.max);
    generateSpecificTerrain('ghost', TERRAIN_LIMITS.ghost.min, TERRAIN_LIMITS.ghost.max);
    generateSpecificTerrain('sanctuary', TERRAIN_LIMITS.sanctuary.min, TERRAIN_LIMITS.sanctuary.max);
    
    // 用树林和岩石填充剩余的空位，使总地形数量在70-80之间
    const totalTerrainCount = getTerrainCount();
    const targetTotal = Math.floor(Math.random() * (TERRAIN_LIMITS.total.max - TERRAIN_LIMITS.total.min + 1)) + TERRAIN_LIMITS.total.min;
    const remainingTerrain = targetTotal - totalTerrainCount;
    
    if (remainingTerrain > 0) {
        // 随机选择使用树林还是岩石填充
        for (let i = 0; i < remainingTerrain; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * MAP_SIZE);
            } while (gameMap[index] !== 'empty');
            
            // 随机选择树林或岩石
            gameMap[index] = Math.random() < 0.7 ? 'forest' : 'rock';
        }
    }
    
    // 确保村庄数量至少10个
    ensureMinimumVillages();
    
    // 渲染地图
    renderMap();
}

function generateSpecificTerrain(type, min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    
    for (let i = 0; i < count; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * MAP_SIZE);
        } while (gameMap[index] !== 'empty');
        
        gameMap[index] = type;
        
        // 如果是村庄，初始化状态
        if (type === 'village') {
            villageStates[index] = {
                type: 'village',
                adjacentSanctuaryTurns: 0
            };
        }
    }
}

function getTerrainCount() {
    let count = 0;
    for (let i = 0; i < MAP_SIZE; i++) {
        if (gameMap[i] !== 'empty') {
            count++;
        }
    }
    return count;
}

function ensureMinimumVillages() {
    let villageCount = 0;
    for (let i = 0; i < MAP_SIZE; i++) {
        if (gameMap[i] === 'village') {
            villageCount++;
        }
    }
    
    // 如果村庄少于10个，在随机空格位上生成
    if (villageCount < TERRAIN_LIMITS.village.min) {
        const needed = TERRAIN_LIMITS.village.min - villageCount;
        for (let i = 0; i < needed; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * MAP_SIZE);
            } while (gameMap[index] !== 'empty');
            
            gameMap[index] = 'village';
            villageStates[index] = {
                type: 'village',
                adjacentSanctuaryTurns: 0
            };
        }
    }
}

function renderMap() {
    const mapGrid = document.getElementById('map-grid');
    mapGrid.innerHTML = '';
    
    for (let i = 0; i < MAP_SIZE; i++) {
        const cell = document.createElement('div');
        cell.className = `map-cell ${gameMap[i]}`;
        
        // 添加文字标签
        const labels = {
            'empty': '',
            'river': '河',
            'rock': '岩',
            'village': '村',
            'large-village': '大村',
            'ghost': '冢',
            'sanctuary': '圣',
            'forest': '林'
        };
        
        cell.textContent = labels[gameMap[i]];
        mapGrid.appendChild(cell);
    }
}

// 辅助函数：获取相邻单元格的索引
function getNeighbors(index) {
    const neighbors = [];
    const row = Math.floor(index / 10);
    const col = index % 10;
    
    // 上
    if (row > 0) neighbors.push(index - 10);
    // 下
    if (row < 9) neighbors.push(index + 10);
    // 左
    if (col > 0) neighbors.push(index - 1);
    // 右
    if (col < 9) neighbors.push(index + 1);
    
    return neighbors;
}

// 更新地图的函数
function updateMap() {
    const newMap = [...gameMap];
    let changed = false;
    
    // 规则1: 村庄与圣域相邻3回合后成为大村庄
    for (let i = 0; i < MAP_SIZE; i++) {
        if (newMap[i] === 'village' && villageStates[i]) {
            // 检查是否与圣域相邻
            const neighbors = getNeighbors(i);
            let hasSanctuary = false;
            
            neighbors.forEach(neighborIndex => {
                if (newMap[neighborIndex] === 'sanctuary') {
                    hasSanctuary = true;
                }
            });
            
            if (hasSanctuary) {
                villageStates[i].adjacentSanctuaryTurns++;
                if (villageStates[i].adjacentSanctuaryTurns >= 3) {
                    newMap[i] = 'large-village';
                    largeVillages.add(i);
                    changed = true;
                }
            } else {
                villageStates[i].adjacentSanctuaryTurns = 0;
            }
        }
    }
    
    // 规则2: 大村庄向相邻空格位扩张
    largeVillages.forEach(villageIndex => {
        const neighbors = getNeighbors(villageIndex);
        neighbors.forEach(neighborIndex => {
            if (newMap[neighborIndex] === 'empty') {
                newMap[neighborIndex] = 'village';
                villageStates[neighborIndex] = {
                    type: 'village',
                    adjacentSanctuaryTurns: 0
                };
                changed = true;
            }
        });
    });
    
    // 规则3: 圣域若与鬼冢相邻，50%概率圣域变鬼冢，50%概率鬼冢变圣域
    for (let i = 0; i < MAP_SIZE; i++) {
        if (newMap[i] === 'sanctuary' || newMap[i] === 'ghost') {
            const neighbors = getNeighbors(i);
            let hasOpposite = false;
            
            neighbors.forEach(neighborIndex => {
                if ((newMap[i] === 'sanctuary' && newMap[neighborIndex] === 'ghost') ||
                    (newMap[i] === 'ghost' && newMap[neighborIndex] === 'sanctuary')) {
                    hasOpposite = true;
                }
            });
            
            if (hasOpposite) {
                if (Math.random() < 0.5) {
                    // 圣域变鬼冢
                    if (newMap[i] === 'sanctuary') {
                        newMap[i] = 'ghost';
                        changed = true;
                    }
                } else {
                    // 鬼冢变圣域
                    if (newMap[i] === 'ghost') {
                        newMap[i] = 'sanctuary';
                        changed = true;
                    }
                }
            }
        }
    }
    
    // 规则4: 鬼冢每个回合都有1%概率消失
    for (let i = 0; i < MAP_SIZE; i++) {
        if (newMap[i] === 'ghost' && Math.random() < 0.01) {
            newMap[i] = 'empty';
            changed = true;
        }
    }
    
    // 规则5: 每回合鬼冢都有1%概率在空格位上生成
    for (let i = 0; i < MAP_SIZE; i++) {
        if (newMap[i] === 'empty' && Math.random() < 0.01) {
            newMap[i] = 'ghost';
            changed = true;
        }
    }
    
    // 更新地图
    gameMap = [...newMap];
    
    // 确保特殊地形数量符合要求
    adjustSpecialTerrains();
    
    // 重新渲染地图
    renderMap();
    
    turnCount++;
    return changed;
}

function adjustSpecialTerrains() {
    // 统计当前特殊地形数量
    let ghostCount = gameMap.filter(type => type === 'ghost').length;
    let sanctuaryCount = gameMap.filter(type => type === 'sanctuary').length;
    
    // 调整鬼冢数量（最多7个）
    while (ghostCount > TERRAIN_LIMITS.ghost.max) {
        const ghostIndices = gameMap.map((type, index) => type === 'ghost' ? index : -1).filter(i => i !== -1);
        const randomGhostIndex = ghostIndices[Math.floor(Math.random() * ghostIndices.length)];
        gameMap[randomGhostIndex] = 'empty';
        ghostCount--;
    }
    
    // 调整圣域数量（最多5个）
    while (sanctuaryCount > TERRAIN_LIMITS.sanctuary.max) {
        const sanctuaryIndices = gameMap.map((type, index) => type === 'sanctuary' ? index : -1).filter(i => i !== -1);
        const randomSanctuaryIndex = sanctuaryIndices[Math.floor(Math.random() * sanctuaryIndices.length)];
        gameMap[randomSanctuaryIndex] = 'empty';
        sanctuaryCount--;
    }
}

// 下一回合功能
document.getElementById('next-turn-btn').addEventListener('click', function() {
    updateMap();
});

// 聊天功能
document.getElementById('send-chat-btn').addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        const playerName = document.getElementById('player-name').textContent;
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = `${playerName}: ${message}`;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
    }
});

document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('send-chat-btn').click();
    }
});

// 初始化
updateEraDisplay();