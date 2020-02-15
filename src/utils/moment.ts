import moment from 'moment';

moment.updateLocale('pt-br', {
  relativeTime: {
    future: 'em %s',
    past: '%s atrás',
    s: 'há alguns segundos',
    ss: 'há %d segundos',
    m: 'há um minuto',
    mm: 'há %d minuto',
    h: 'há uma hora',
    hh: 'há %d horas',
    d: 'há um dia',
    dd: 'há %d dias',
    M: 'há um mês',
    MM: 'há %d meses',
    y: 'há um ano',
    yy: 'há %d anos',
  },
});

moment.locale('pt-br');

export const MomentFormat = (data, format = 'DD/MM/YYYY') => {
  return moment(data).format(format);
};

export const FromNow = data => {
  return moment(data).fromNow();
};
