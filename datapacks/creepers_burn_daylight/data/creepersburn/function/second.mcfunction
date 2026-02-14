execute as @e[type=minecraft:creeper] at @s if predicate creepersburn:in_daylight run data merge entity @s {Fire:100}
schedule function creepersburn:second 1s
