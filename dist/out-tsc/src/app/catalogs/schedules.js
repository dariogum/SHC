"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.PROFESSIONALS = [
    {
        id: 1,
        name: 'Roberto',
        lastname: 'Loprete'
    },
    {
        id: 2,
        name: 'Natalie',
        lastname: 'Costrosa'
    },
];
exports.SCHEDULES = [
    {
        appointmentInterval: 20,
        color: '#bbdefb',
        id: 1,
        name: 'Pediatría',
        periodicity: '1',
        professionals: [exports.PROFESSIONALS[0]],
        selectedDays: [],
        validityEnd: new Date(2018, 11, 31),
        validityStart: new Date(2018, 0, 1),
        weekDays: [
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
        ],
    },
    {
        appointmentInterval: 30,
        color: '#dcedc8',
        id: 2,
        name: 'Traumatología',
        periodicity: '2',
        professionals: [exports.PROFESSIONALS[0], exports.PROFESSIONALS[1]],
        selectedDays: [],
        validityEnd: new Date(2018, 11, 31),
        validityStart: new Date(2018, 0, 1),
        weekDays: [
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
            {
                active: true,
                hours: [
                    {
                        start: moment().set({ 'hour': 8, 'minute': 30 }),
                        end: moment().set({ 'hour': 12, 'minute': 45 }),
                    },
                    {
                        start: moment().set({ 'hour': 16, 'minute': 30 }),
                        end: moment().set({ 'hour': 19, 'minute': 30 }),
                    }
                ]
            },
        ],
    },
];
//# sourceMappingURL=schedules.js.map