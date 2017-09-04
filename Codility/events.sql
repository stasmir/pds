drop table #events;
create table #events (
      event_type integer not null,
      value integer not null,
      time datetime2(0) not null,
      unique(event_type, time)
  );


insert into #events
		(event_type, value, time)
values	
(2,5,'2016-10-10'),
--(4,-42,'2016-10-11'),
(2,2,'2016-10-12'),
(2,2,'2016-10-13'),
(2,-2,'2016-10-14'),
(2,7,'2016-10-11');
--(3,16,'2016-10-10'),
--(3,20,'2016-10-11');

select *
from
(
select a.event_type, a.time, a.value - b.value d, row_number() over(partition by a.event_type order by b.time desc) as r
from #events a
	join #events b on a.event_type = b.event_type and a.time > b.time --and a.time =
) as t
where t.r = 1
order by t.event_type, t.time
