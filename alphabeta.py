import matplotlib.pyplot as plt


class node:
    def __init__(self, type, alpha=float("-inf"), beta=float("inf")):
        self.type = type
        self.alpha = alpha
        self.beta = beta
        self.children = []
        self.val = 0
        self.par = None
        self.x = 0
        self.y = 0


def CreateTree(root, row):
    global nodes
    global id
    id = id + 1
    nodes[row].append(root)
    chrtype = ""
    if root.type == "max":
        chrtype = "min"
    elif root.type == "min":
        chrtype = "max"
    if root.type == "leaf":
        print("\n当前节点为第 ", id, " 个节点（DFS计数法）")
        a = int(input("请输入该叶子子节点的值："))
        root.val = a
        return
    print("\n当前节点为第 ", id, " 个节点（DFS计数法）")
    a = list(map(int, input("请输入其子节点，1表示非叶子节点，2表示叶子节点: ").split()))
    for i in a:
        if i == 1:
            root.children.append(node(type=chrtype))
        if i == 2:
            root.children.append(node(type="leaf"))
    for child in root.children:
        child.par = root
        CreateTree(child, row + 1)


def PrintTree(root, row):
    global nodes
    root.y = 100 - row
    root.x = 100 + 50 * (nodes[row].index(root) - len(nodes[row]) / 2)
    if root.par is not None:
        # print([root.x, root.y])
        # print([root.par.x, root.par.y])
        plt.plot([root.x, root.par.x], [root.y, root.par.y], color="g")
    if root.type == "max":
        plt.scatter(root.x, root.y, marker="v", color="red", s=150)
    elif root.type == "min":
        plt.scatter(root.x, root.y, marker="^", color="blue", s=150)
    else:
        plt.scatter(root.x, root.y, marker="*", color="green", s=150)
        plt.text(root.x, root.y - 0.3, str(root.val))
    for child in root.children:
        PrintTree(child, row + 1)

def max(a,b):
    if a>=b:
        return a
    return b

def min(a,b):
    if a<=b:
        return a
    return b

def alphaBeta(root, row):
    global nodes
    root.y = 100 - row
    root.x = 100 + 50 * (nodes[row].index(root) - len(nodes[row]) / 2)
    if root.par is not None:
        plt.plot([root.x, root.par.x], [root.y, root.par.y], color="g")
    if root.type == "leaf":
        plt.scatter(root.x, root.y, marker="^", color="blue", s=150)
        plt.text(root.x, root.y - 0.5, str(root.val))
        return root.val
    if root.type == "max":
        plt.scatter(root.x, root.y, marker="v", color="red", s=150)
        for child in root.children:
            child.alpha = root.alpha
            child.beta = root.beta
            root.alpha = max(root.alpha, alphaBeta(child,row +1))
            if root.beta <= root.alpha:
                break
        # plt.text(root.x, root.y - 0.5, "( "+str(root.alpha)+", "+str(root.beta)+" )")
        return root.alpha
    if root.type == "min":
        plt.scatter(root.x, root.y, marker="*", color="green", s=150)
        for child in root.children:
            child.alpha = root.alpha
            child.beta = root.beta
            root.beta = min(root.beta, alphaBeta(child, row+1))
            if root.beta <= root.alpha:
                break
        # plt.text(root.x, root.y - 0.5, "( " + str(root.alpha) + ", " + str(root.beta) + " )", fontsize=5)
        return root.beta


if __name__ == "__main__":
    plt.rcParams['figure.dpi'] = 300
    global id
    global nodes
    nodes = [[] for i in range(100)]
    root = node("max")
    id = 0
    CreateTree(root, 0)
    root = root
    # PrintTree(root, 0)
    alphaBeta(root, 0)
    plt.axis("off")
    plt.show()
    # X = [1, 2, 3, 3, 3]
    # Y = [2, 4, 5, 7, 8]
    # plt.scatter(X, Y, marker="v", color="red")
    # plt.plot([1, 2], [2, 4], color="r")
    # plt.axis("off")
    # plt.show()
