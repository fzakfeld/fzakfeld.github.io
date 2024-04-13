---
title: Using Policy-Based Routing for BGP routes in FRR.
---

Policy-Based Routing is commonly used on Linux hosts to make individual routing decisions based on certain factors like the outgoing interface. For example, your web server may have an interface for actual incoming web traffic and another one for management. Both will probably have their own default route, and PBR is used by the Linux kernel to decide which one it should use.

Usually you would do something like that:
```
ip -6 rule add oif eth3 lookup 200
ip -6 route add ::/0 via 2001:db8::1337 dev eth0 table 200
```

This will make sure that all traffic sent from eth3 (where our web server's main IP address is on) is routed to `2001:db8::1337`, while everything else will use the routes installed in the default table.

However, if you are using BGP for your uplink, the default routes are not installed statically but rather dynamically. Luckily, in a recent commit FRR added the option to specify the routing table in which incoming routes are installed. This is controlled via route-maps.

```
router bgp 65001
neighbor interface eth3 remote-as external
!
address family ipv6 unicast
  neighbor interface eth3 activate
  neighbor interface eth3 route-map bgp_in_external in
!
route-map bgp_in_external permit 10
  set table 200
!
```

The `set table 200` keyword will tell FRR to install the routes in to table 200. You then just need to specify the policies with the `ip rule` command (shown above).


### References

[https://docs.frrouting.org/en/stable-8.2/routemap.html#clicmd-set-table-1-4294967295](https://docs.frrouting.org/en/stable-8.2/routemap.html#clicmd-set-table-1-4294967295)
