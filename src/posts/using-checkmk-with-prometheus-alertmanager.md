---
title: Using Checkmk with Prometheus Alertmanager
---

If you are like me you probably love Prometheus and want to use it for monitoring purposes. You can do this very easily with Alertmanager. But the alerting options are somewhat limited there and you might have another monitoring system in place, like Checkmk.

Luckily, Checkmk can easily work together with the Prometheus Alertmanager.

## Steps

Unlike Prometheus Checkmk works on a host basis. You need to create a single "dummy" host, for example, called "my-alertmanager". Set it as folows:

- IP address family: No IP
- Checkmk agent / API integrations: Configured API integrations, no Checkmk agent
- SNMP: No SNMP

This host won't actually be monitored, but it will be the host where the alerts are shown.

Now go to "Setup" -> "Agents" -> "VM, cloud, container" -> "Alertmanager". Create a Rule and configure it as follows:

- Description: my-alertmanager (or anything you'd like)
- URL server address: your prometheus host with port (e.g. prometheus.example.com:443)
- Authentication: set this according to your prometheus authentication, e.g. basic
- Protocol: HTTP or HTTPS

Under "Conditions", add your dummy host as an explicit host.

Now save and run a service discovery on your dummy host. The alert groups should pop up as services.
