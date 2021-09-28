let menuList = [

	{
		"path": "/websiteInformation",
		"title": "网站基础信息",
		"children": [{
				"path": "/websiteInformation", //菜单项所对应的路由路径
				"title": "网站基础信息", //菜单项名称
				"url": 'mh/websiteInformation/index'
		},
		{
				"path": "/menu",
				"title": "菜单",
				"url": 'mh/menu/index'
		},
		
		]
	},
	{
		"path": "/home", //菜单项所对应的路由路径
		"title": "首页", //菜单项名称
		"children": [], //是否有子菜单，若没有，则为[]
		"url": 'mh/home/index'
	},

	{
		"path": "/project",
		"title": "项目",
		"children": [{
				"path": "/project",
				"title": "项目管理",
				"url": 'mh/project/index'
		},
		
		{
				"path": "/category",
				"title": "项目分类管理",
				"url": 'mh/category/index'
		}
		]
	},
	{
		"path": "/news", //菜单项所对应的路由路径
		"title": "新闻", //菜单项名称
		"children": [], //是否有子菜单，若没有，则为[]
		"url": 'mh/news/index'
	},
	{
		"path": "/about", //菜单项所对应的路由路径
		"title": "关于", //菜单项名称
		"children": [], //是否有子菜单，若没有，则为[]
		"url": 'mh/about/index'
	},
//	{
//		"path": "/recruit", //菜单项所对应的路由路径
//		"title": "招募", //菜单项名称
//		"children": [], //是否有子菜单，若没有，则为[]
//		"url": 'mh/recruit/index'
//	},
	{
		"path": "/recruit",
		"title": "招募",
		"children": [{
				"path": "/recruit", //菜单项所对应的路由路径
				"title": "招募", //菜单项名称
				"url": 'mh/recruit/index'
		},
		{
				"path": "/position",
				"title": "职位管理",
				"url": 'mh/position/index'
		},
		
		]
	},


//	{
//		"path": "/slaughter",
//		"title": "宰杀",
//		"children": [{
//				"path": "/userSlaughter",
//				"title": "宰杀列表",
//				"url": 'slaughter/userSlaughter/index'
//		},
//		{
//				"path": "/slaughterLog",
//				"title": "宰杀记录",
//				"url": 'slaughter/slaughterLog/index'
//		}
//		]
//	}
]
export default menuList