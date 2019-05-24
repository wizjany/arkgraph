import { ATTRIBUTES } from './Attributes';
import { RESOURCES } from './Resources';
import json_data from './materials.json';

const OPERATORS_LIST = [
	{ name: '推进之王' },
	{ name: '能天使' },
	{ name: '闪灵' },
	{ name: '星熊' },
	{ name: '伊芙利特' },
	{ name: '塞雷娅' },
	{ name: '银灰' },
	{ name: '夜莺' },
	{ name: '艾雅法拉' },
	// { name: '凯尔希' },
	{ name: '安洁莉娜' },
	{ name: '白面鸮' },
	{ name: '德克萨斯' },
	{ name: '芙兰卡' },
	{ name: '幽灵鲨' },
	{ name: '凛冬' },
	{ name: '阿米娅' },
	{ name: '普罗旺斯' },
	{ name: '蓝毒' },
	{ name: '赫默' },
	{ name: '临光' },
	{ name: '雷蛇' },
	{ name: '红' },
	// { name: '夜魔' },
	{ name: '天火' },
	{ name: '初雪' },
	{ name: '因陀罗' },
	// { name: '陈' },
	{ name: '拉普兰德' },
	{ name: '华法琳' },
	{ name: '守林人' },
	{ name: '狮蝎' },
	{ name: '火神' },
	{ name: '真理' },
	{ name: '白金' },
	{ name: '陨星' },
	{ name: '梅尔' },
	{ name: '可颂' },
	{ name: '崖心' },
	{ name: '食铁兽' },
	{ name: '空' },
	{ name: '暴行' },
	{ name: '深海色' },
	{ name: '杜宾' },
	// { name: '梅' },
	{ name: '夜烟' },
	{ name: '白雪' },
	{ name: '远山' },
	{ name: '流星' },
	{ name: '末药' },
	{ name: '蛇屠箱' },
	{ name: '艾丝黛尔' },
	// { name: '猎蜂' },
	{ name: '嘉维尔' },
	{ name: '慕斯' },
	{ name: '砾' },
	{ name: '暗索' },
	{ name: '地灵' },
	{ name: '调香师' },
	{ name: '讯使' },
	{ name: '霜叶' },
	{ name: '清道夫' },
	{ name: '古米' },
	{ name: '角峰' },
	// { name: '断罪者' },
	{ name: '缠丸' },
	{ name: '阿消' },
	{ name: '红豆' },
	{ name: '杰西卡' },
	{ name: '芬' },
	{ name: '克洛丝' },
	{ name: '炎熔' },
	{ name: '芙蓉' },
	{ name: '米格鲁' },
	{ name: '卡缇' },
	{ name: '史都华德' },
	{ name: '香草' },
	{ name: '玫兰莎' },
	{ name: '安赛尔' },
	{ name: '梓兰' },
	{ name: '翎羽' },
	{ name: '安德切尔' },
	{ name: '夜刀' },
	{ name: '巡林者' },
	{ name: '杜林' },
	{ name: '黑角' },
	{ name: '12F' },
	{ name: 'Lancet-2' },
	{ name: 'Castle-3' },
];

const mapMaterial = (material) => ({
	resource: Object.entries(RESOURCES).find(([k, v]) => v.name === material.resource)[1].id,
	quantity: Number(material.quantity),
});

const parseJson = (record) => {
	const operator = {
		name: record.name,
	};

	operator.skills = Object.keys(record.materials.skill)
		.filter(name => name.split(' ').length === 1)
		.map((upgrade, level) => ({
			level: level + 1,
			materials: record.materials.skill[upgrade].map(mapMaterial),
		}));
	const master_skills = new Set();
	Object.keys(record.materials.skill)
		.filter(name => name.split(' ').length > 1)
		.forEach(skill_name => master_skills.add(skill_name.split(' ')[0]));
	operator.master_skills = Array.from(master_skills).map(skill_name => ({
		name: skill_name,
		upgrades: Object.entries(record.materials.skill)
			.filter(([k, v]) => k.includes(skill_name)).map(([k, v]) => ({
				level: k.split(' ')[1].split('→')[0] - 7,
				materials: v.map(mapMaterial),
			})),
	}));
	operator.elites = Object.entries(record.materials.elite).map(([k,v]) => (
		v.map(mapMaterial)
	));

	return operator;
};

const OPERATORS = json_data.map(parseJson);

export default class Operator {
	constructor(name, attributes) {
		this.name = name;
		this.attributes = attributes;
	}
}
export {
	OPERATORS,
};
