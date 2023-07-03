# The PLG Stack (Promtail, Loki and Grafana)

![](./.github/assets/plg_stack.png)

* Promtail is an agent that needs to be installed on each node running your applications or services. It detects targets 
(such as local log files), attaches labels to log streams from the pods, and ships them to Loki.
* Loki is the heart of the PLG Stack. It is responsible to store the log data.
* Grafana is an open-source visualization platform that processes time-series data from Loki and makes the logs 
accessible in a web UI.

## Promtail's installation at k8s cluster
[Promtail's installation at k8s cluster](https://grafana.com/docs/loki/latest/clients/promtail/installation/)

```sh
helm repo add grafana https://grafana.github.io/helm-charts
```

```sh
helm repo update
```

```sh
kubectl apply -f namespace.yaml
```

```sh
helm upgrade --namespace=plg-observability --install promtail grafana/promtail
```

```sh
kubectl apply -f promtail.yaml
```