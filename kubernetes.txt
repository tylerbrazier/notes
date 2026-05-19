## Clusters and Namespaces

- Clusters are physical/virtual nodes.
- Namespaces are logical partitions in a cluster.

```
--------------Cluster-------------
|                                  |
|  -Namespace A-    -Namespace B-  |
| |             |  |             | |
| |_____________|  |_____________| |
|                                  |
 ----------------------------------
```

## Contexts

Context is a client-side configuration thing:

- Each is a combination of User+Cluster+Namespace
- `~/.kube/config` has a list of contexts,
  and a `current-context` that `kubeclt` will use to know what to run against

## Pods

![pods](https://kubernetes.io/docs/tutorials/kubernetes-basics/public/images/module_03_pods.svg)

## Nodes

![nodes](https://kubernetes.io/docs/tutorials/kubernetes-basics/public/images/module_03_nodes.svg)

The Control Plane manages Nodes by communicating with the Kubelet on the Node.
