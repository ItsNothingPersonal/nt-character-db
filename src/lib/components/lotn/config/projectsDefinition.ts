import { clanName } from '$lib/zod/lotn/enums/clanName';
import type { ProjectDefinition } from '$lib/zod/projectDefinition';

export const projectsDefinition: ProjectDefinition = {
	Protektorat: {
		name: 'Protektorat',
		projectLead: 'Rai',
		storytellers: ['Rai', 'Anu'],
		defaultClans: clanName.options,
		startExp: 20,
		description: [
			'Das Setting spielt zeitlich in der Gegenwart. Anders als bei bisherigen Vampire Chroniken ist moderne Technik dabei ein essenzieller Bestandteil. Jäger verfügen spätestens seit der Pandemie über Scanner, die die Körperwärme messen können. Seltsame Vorkommnisse verbreiten sich über soziale Medien wie ein Lauffeuer. Die sog. zweite Inquisition hat gänzlich neue Mittel die Jagd auf Vampire zu intensivieren. Die Jäger sind zu Gejagten geworden.',
			'In dieser modernen Welt sind Reisen für Vampire gefährlich und üblicherweise verlässt man die Sicherheit der angestammten Domäne nicht. Wir werden dies in dieser Chronik deutlich vehementer durchsetzen. Die Welt dort draußen ist unbekannt und bedrohlich.',
			'Der Fokus wird erneut auf den Blutsverwandten der Stadt Nürnberg liegen. Dabei wird es vom Start weg wieder eine Timeline der Domäne sowie persönliche Verstrickungen der Startcharaktere geben. Spätere Charaktere werden wir nach Möglichkeit ebenfalls mit dem Werdegang Nürnbergs und seiner Vampire verknüpfen.',
			'Durch das mysteriöse Verschwinden der Ahnen ist die Camarilla in Aufruhr. Die Zweite Inquisition stellt dabei nicht das einzige Problem dar. Die Domänen der Sekte müssen zunächst die Ordnung in ihren Städten wieder festigen und sich gegenüber der an Macht gewinnenden Anarchenbewegung behaupten. Im Schatten lauert indes mit den versprengten Überresten des Sabbats ein gänzlich unmenschlicher und grausamer Feind. Gerüchte über unaussprechliche Gräueltaten machen mehr und mehr die Runde.',
			'In diesen Zeiten ist der Weg nach oben für ambitionierte Ancillae und Neugeborene plötzlich so frei wie noch niemals zuvor. Ämter müssen notgedrungen durch die jüngeren Generationen besetzt werden und neue Allianzen werden aus Notwendigkeit heraus geschmiedet. Ebenso müssen Caitiff und Dünnblütige ihren Platz in der Welt finden.',
			'Um sich gegen die aufstrebende, zunehmend an Macht gewinnende Anarchenbewegung und weitere Bedrohungen zu stemmen, haben sich mehrere Domänen Mittelfrankens zu einem Bündnis - dem titelgebenden Protektorat – zusammengeschlossen. Doch die Allianz ist keinesfalls frei von Spannungen. Unterschiedliche Ansichten, eigene Agenden und politische Winkelzüge stellen das Protektorat immer wieder vor neue Herausforderungen. Die beteiligten Städte konkurrieren untereinander um die Hegemonialstellung in diesem Zweckbündnis. Wird Nürnberg als Vasall oder gar als Schirmherr des Protektorats enden? Das gilt es gemeinsam herauszufinden.',
			'Die Domäne wird in diesem Setting äußeren Druck durch die Anarchen ausgesetzt werden. Gleichzeitig läuft ein Schattenkrieg mit dem Sabbat. Im Inneren finden indes die Intrigen der Camarilla um die relevanten Machtpositionen statt. Auch wenn Klüngel vermeintlich Schutz versprechen, ist die Gefahr allgegenwärtig, niemand sicher und das Setting deutlich tödlicher.'
		]
	},
	Anarchen: {
		name: 'Anarchen',
		projectLead: 'Michael',
		storytellers: ['Michael', 'Mel'],
		defaultClans: [
			'Brujah',
			'Malkavian',
			'Nosferatu',
			'Toreador',
			'Gangrel',
			'Banu Haqim',
			'Caitiff'
		],
		startExp: 20,
		description: ['(PLACEHOLDER!)']
	}
};
